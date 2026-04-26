import LeaderboardStyle from "./Leaderboard.module.css";

import FirstIcon from "../../../assets/icons/home/leaderboard/first.svg?react";
import SecondIcon from "../../../assets/icons/home/leaderboard/second.svg?react";
import ThirdIcon from "../../../assets/icons/home/leaderboard/third.svg?react";

import LeaderboardIcon from "../../../assets/icons/general/leaderboard.svg?react";
import ReputationIcon from "../../../assets/icons/general/reputation.svg?react";

import { UserProfile } from "../../../components/common/UserProfile/UserProfile";
import { useEffect, useState } from "react";
import { useLeaderboardHandler } from "./Leaderboard.handler";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";

interface UserProfileInterface{
    userName?:string;
    profile?: string;
    firstName?: string;
    lastName?:string;
    reputationScore?: number;
}

interface RankEntryProps{
    rank : number;
    user: UserProfileInterface;
}

const RankEntry : React.FC<RankEntryProps> = ({rank, user})=>{

    const {safeNavigate} = useSafeNavigate();

    let RankIcon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>|undefined = undefined;
    let rankColor : string | undefined = undefined;
    if(rank==1){
        RankIcon = FirstIcon;
        rankColor = "gold";
    }
    else if(rank==2){
        RankIcon=SecondIcon;
        rankColor = "silver";
    }else if(rank==3){
        RankIcon = ThirdIcon;
        rankColor = "bronze";
    }
    
    return (
        <>
            <div className={LeaderboardStyle["rank-list-container"]}>
                <div className={LeaderboardStyle["left"]}>
                    {
                    RankIcon? 
                        <RankIcon className={LeaderboardStyle["rank"]}/>
                        :
                        (<span className={LeaderboardStyle["rank"]}>{rank}</span>)    
                    }
                </div>
                <div className={LeaderboardStyle["right"]} onClick={()=>safeNavigate(homeRoutes.profile+`/${user.userName}`)}>
                    <UserProfile color={rankColor} src={user.profile} className={LeaderboardStyle["user-profile"]}/>
                    <div className={LeaderboardStyle["user-data"]}>
                        <div className={LeaderboardStyle["user-name"]}>
                            {user.firstName} {user.lastName}
                        </div>
                        <div className={`${LeaderboardStyle["user-reputation"]} ${((user.reputationScore??0)<0)? LeaderboardStyle["danger"]:""}`}>
                            <ReputationIcon className={`${LeaderboardStyle["reputation-icon"]} ${((user.reputationScore??0)<0)? LeaderboardStyle["danger"]:""}`}/>
                            <div className={LeaderboardStyle["reputation-count"]}>
                                {user.reputationScore}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const Leaderboard = ()=>{

    const [entries, setEntries] = useState<any[]>([]);

    const {getLeaderboardHandler} = useLeaderboardHandler(setEntries);

    useEffect(()=>{
        getLeaderboardHandler();
    }, []);

    return (
        <>
            <div className={LeaderboardStyle["container"]}>
                <div className={LeaderboardStyle["header"]}>
                    <LeaderboardIcon className={LeaderboardStyle["leaderboard-icon"]}/>
                    <div className={LeaderboardStyle["heading"]}>Leaderboard</div>
                </div>
                <div className={LeaderboardStyle["rankings"]}>
                    {/* <RankEntry rank={1}/> */}
                    {
                        entries.map((elem, ind)=>{
                            return <RankEntry key={elem.uid._id} rank={ind+1} user={elem.uid}/>
                        })
                    }
                </div>
            </div>
        </>
    );
}