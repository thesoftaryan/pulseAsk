import LeaderboardStyle from "./Leaderboard.module.css";

import FirstIcon from "../../../assets/icons/home/leaderboard/first.svg?react";
import SecondIcon from "../../../assets/icons/home/leaderboard/second.svg?react";
import ThirdIcon from "../../../assets/icons/home/leaderboard/third.svg?react";

import LeaderboardIcon from "../../../assets/icons/general/leaderboard.svg?react";
import ReputationIcon from "../../../assets/icons/general/reputation.svg?react";

import { UserProfile } from "../../../components/common/UserProfile/UserProfile";

interface RankEntryProps{
    rank : number;
}

const RankEntry : React.FC<RankEntryProps> = ({rank})=>{

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
                <div className={LeaderboardStyle["right"]}>
                    <div className={LeaderboardStyle["profile"]}>
                        <UserProfile color={rankColor}/>
                    </div>
                    <div className={LeaderboardStyle["user-data"]}>
                        <div className={LeaderboardStyle["user-name"]}>
                            Aryan Maurya
                        </div>
                        <div className={LeaderboardStyle["user-reputation"]}>
                            <ReputationIcon className={LeaderboardStyle["reputation-icon"]}/>
                            <div className={LeaderboardStyle["reputation-count"]}>
                                2.6K
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const Leaderboard = ()=>{
    return (
        <>
            <div className={LeaderboardStyle["container"]}>
                <div className={LeaderboardStyle["header"]}>
                    <LeaderboardIcon className={LeaderboardStyle["leaderboard-icon"]}/>
                    <div className={LeaderboardStyle["heading"]}>Leaderboard</div>
                </div>
                <div className={LeaderboardStyle["rankings"]}>
                    <RankEntry rank={1}/>
                    <RankEntry rank={2}/>
                    <RankEntry rank={3}/>
                    <RankEntry rank={4}/>
                    <RankEntry rank={5}/>
                    <RankEntry rank={6}/>
                    <RankEntry rank={7}/>
                    <RankEntry rank={8}/>
                    <RankEntry rank={9}/>
                    <RankEntry rank={10}/>
                </div>
            </div>
        </>
    );
}