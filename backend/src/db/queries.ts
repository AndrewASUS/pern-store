import { db } from "./index";
import { eq } from "drizzle-orm";
import {
  users,
  comments,
  products,
  type NewUser,
  type NewComment,
  type newProduct,
} from "./schema";

// User queries User queries User queries User queries User queries User queries User queries
export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({ where: eq(users.id, id) });
};

// TS specific allows you to update a partial component in the user i.e. email
export const updateUser = async (id: string, data: Partial<NewUser>) => {
  const existingUser = await getUserById(id)
  if (!existingUser) {
    throw new Error(`User with ${id} not found`)
  }

  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return user;
};

// Upsert => create or update
export const upsertUser = async (data: NewUser) => {
  const [user] = await db
    .insert(users)
    .values(data)
    .onConflictDoUpdate({
      target: users.id,
      set: data,
    })
    .returning()

    return user
};

// Product queries Product queries Product queries Product queries Product queries Product queries
export const createProduct = async (data: newProduct) => {
  const [product] = await db.insert(products).values(data).returning();
  return product;
};

export const getAllProducts = async () => {
  return db.query.products.findMany({
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)], // Descending "latest product first"
    // The square brackets in [desc(products.createdAt)] are required by drizzle orm as it expects an array, even for a single column
  });
};

export const getProductById = async (id: string) => {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      user: true,
      comments: {
        with: { user: true },
        orderBy: (comments, { desc }) => [desc(comments.createdAt)],
      },
    },
  });
};

export const getProductsByUserId = async (userId: string) => {
  return db.query.products.findMany({
    where: eq(products.userId, userId),
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)], // Descending "latest product first"
  });
};

export const updateProduct = async (id: string, data: Partial<newProduct>) => {
  const existingProduct  = await getProductById(id)
  if (!existingProduct) {
    throw new Error(`Product with ${id} not found`)
  }

  const [product] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();

  return product;
};

export const deleteProduct = async (id: string) => {
  const existingProduct = await getProductsByUserId(id)
  if (!existingProduct) {
    throw new Error(`Product with ${id} not found`)
  }

  const [product] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();

  return product;
};

// Comment querries Comment querries Comment querries Comment querries Comment querries Comment querries
export const createComment = async (data: NewComment) => {
  const [comment] = await db.insert(comments).values(data).returning();

  return comment;
};

export const deleteComment = async (id: string) => {
  const existingComment = await getCommentById(id)
  if (!existingComment) {
    throw new Error(`Comment with ${id} nt found`)
  }

  const [comment] = await db
    .delete(comments)
    .where(eq(comments.id, id))
    .returning();

  return comment;
};

export const getCommentById = async (id: string) => {
  return db.query.comments.findFirst({
    where: eq(comments.id, id),
    with: { user: true }
  })
}
 