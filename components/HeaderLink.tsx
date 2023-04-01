import { AvatarTypeMap, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { signOut, useSession } from "next-auth/react";
import React from "react";

interface Props {
  text: string;
  Icon: any;
  active?: boolean;
  feed?: boolean;
  avatar?: boolean;
  hidden?: boolean;
}
const HeaderLink: React.FC<Props> = ({avatar=false, text, Icon, feed=false, active=false, hidden=false }) => {   
  const {data} = useSession();
  const imgUrl = data?.user?.image? data?.user?.image:'';
  return (
    <div
      className={`flex flex-col cursor-pointer justify-center items-center ${feed
          ? "text-black/70 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1"
          : "text-gray-500 hover:text-gray-700"
        } ${hidden && "hidden md:inline-flex"}`}
      onClick={()=> avatar && signOut()}
    >
      {avatar? (<Icon className="!h-7 !w-7 lg:!-mb-1" src={imgUrl} />):(<Icon />)}
      <h4 className={`hidden text-sm ${ feed&& "lg:flex mx-auto justify-center w-full"}`}>{text}</h4>
      {active&& <span className={`hidden lg:inline-flex h-0.5 rounded-t-full bg-black dark:bg-white w-[calc(100%+20px)]`}></span>}
    </div>
  );
};

export default HeaderLink;
