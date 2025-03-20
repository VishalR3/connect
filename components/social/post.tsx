import { Post as PostType } from "@/mocks/post";
import dayjs from "dayjs";
import { Ellipsis, Heart, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import { Avatar } from "@mui/material";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export default function Post({ post }: { post: PostType }) {
  return (
    <div>
      <div className="flex items-center justify-between px-4 mb-2">
        <div className="flex gap-2 items-center ">
          <Avatar
            alt={post.author}
            src={post.avatar}
            sx={{ width: 24, height: 24 }}
          />
          <div className="font-semibold text-sm">{post.author}</div>
        </div>
        <div>
          <Ellipsis size={20} />
        </div>
      </div>
      <Image
        src={post.image}
        width={300}
        height={300}
        alt={post.caption}
        className="w-full "
      />
      <div className="px-4 mt-2 mb-4 flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Heart size={20} /> {post.likes}
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle size={20} /> {post.comments}
          </div>
          <div>
            <Send size={20} />
          </div>
        </div>
        <div className="text-sm">
          <span className="font-semibold me-2">{post.author}</span>
          <span>{post.caption}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {dayjs(post.timestamp).fromNow()}
        </div>
      </div>
    </div>
  );
}
