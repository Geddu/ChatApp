import { toSvg } from "jdenticon";

const RandomIcon = ({ name }: { name: string }) => (
    <div style={{
        height: 40, flexShrink: 0,
        minWidth: '100%',
        minHeight: '100%'
    }}>
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(toSvg(name, 40))}`} />
    </div>
)

export default RandomIcon