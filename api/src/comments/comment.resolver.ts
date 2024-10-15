import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Comment } from "./comments.entity";
import { Repo } from "../repos/repos.entity";

@InputType()
class NewComment {
  @Field()
  author: string;

  @Field()
  text: string;

  @Field()
  repoId: string;
}

@Resolver(Comment)
export default class CommentResolver {
  @Mutation(() => Comment)
  async createNewComment(
    @Arg("data") newComment: NewComment
  ): Promise<Comment> {
    const { author, text, repoId } = newComment;

    // Check if repo exists and get it to add to comment
    const newCommentRepo = await Repo.findOneOrFail({
      where: { id: repoId },
    });

    const comment = new Comment();
    comment.author = author;
    comment.text = text;
    comment.repo = newCommentRepo;

    const savedComment = await comment.save();

    // Refetch the new comment with all possible relations
    const returnComment = await Comment.findOneOrFail({
      where: { id: savedComment.id },
      relations: {
        repo: {
          status: true,
          comments: true,
          languages: true,
        },
      },
    });

    return returnComment;
  }
}
