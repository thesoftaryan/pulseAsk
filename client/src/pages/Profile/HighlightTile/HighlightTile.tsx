import HighlightTileStyle from "./HighlightTile.module.css";

interface HighlightTileProps{
    Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>, 
    title: string, 
    value?: string,
}

export const HighlightTile:React.FC<HighlightTileProps> = ({Icon, title, value})=>{
    return (
        <div className={HighlightTileStyle["highlight-tile"]}>
            <Icon className={HighlightTileStyle["icon"]}/>
            <div className={HighlightTileStyle["highlight-stat"]}>
                <div className={HighlightTileStyle["highlight-stat-title"]}>{title}</div>
                <div className={HighlightTileStyle["highlight-stat-value"]}>{value}</div>
            </div>
        </div>
    );
}