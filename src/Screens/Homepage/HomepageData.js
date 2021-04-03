import {AiOutlineControl, AiOutlinePlus} from "react-icons/ai";
import {BiAnalyse} from "react-icons/bi";
import {DiJqueryLogo} from "react-icons/di";

export const HomeData = [ {
    id: "1",
    icon: <AiOutlinePlus size={25} />,
    name:"Add Test",
    path: "/addtest"
},
{
    id: "2",
    icon: <BiAnalyse size={25} />,
    name:"Analysis",
    path: "/analysis"
},
{
    id: "3",
    icon: <DiJqueryLogo size={25} />,
    name:"Adress Queries",
    path: "/adressqueries"
},
{
    id: "4",
    icon: <AiOutlineControl size={25} />,
    name:"Access Control",
    path: "/accesscontrol"
},
]