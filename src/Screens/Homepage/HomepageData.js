import {AiOutlineControl, AiOutlinePlus} from "react-icons/ai";
import {GrFormView} from "react-icons/gr";
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
    icon: <GrFormView size={25} />,
    name:"View Mocks",
    path: "/viewmocks"
},
{
    id: "3",
    icon: <BiAnalyse size={25} />,
    name:"Analysis",
    path: "/analysis"
},
{
    id: "4",
    icon: <DiJqueryLogo size={25} />,
    name:"Queries",
    path: "/queries"
},
{
    id: "5",
    icon: <AiOutlineControl size={25} />,
    name:"Access Control",
    path: "/accesscontrol"
},
]