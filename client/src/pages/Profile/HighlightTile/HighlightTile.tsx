import HighlightTileStyle from "./HighlightTile.module.css";

interface HighlightTileProps{
    Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>, 
    title: string, 
    value?: string,
    danger?: boolean,
}

export const HighlightTile:React.FC<HighlightTileProps> = ({Icon, title, value, danger})=>{
    return (
        <div className={`${HighlightTileStyle["highlight-tile"]} ${danger? HighlightTileStyle["danger"]:""}`}>
            <Icon className={`${HighlightTileStyle["icon"]} ${danger? HighlightTileStyle["danger"]:""}`}/>
            <div className={HighlightTileStyle["highlight-stat"]}>
                <div className={`${HighlightTileStyle["highlight-stat-title"]}`}>{title}</div>
                <div className={`${HighlightTileStyle["highlight-stat-value"]}`}>{value}</div>
            </div>
        </div>
    );
}