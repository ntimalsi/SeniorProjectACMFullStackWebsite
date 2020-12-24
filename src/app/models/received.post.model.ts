export interface ReceivedPost {
  postId: string;
  creator: string;
  username: string;
  designation: string;
  time: string;
  lcounts: number;
  postContent: string;
  // comments: Comment[];
  comcounts: number;
  profileimg: string;
}
