import { Router } from "express";
import { requireAuth } from "@clerk/express";

import * as commentController from "../controllers/commentController";

const router = Router();

// Add comments Add comments Add comments Add comments Add comments Add comments
router.post("/:productId", requireAuth(), commentController.createComment);

// Delete comment Delete comment Delete comment Delete comment Delete comment Delete comment
router.delete("/:commentId", requireAuth(), commentController.deleteComment);

export default router;
