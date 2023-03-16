import { XWing } from "./XWing";
import { AWing } from "./AWing";
import { YWing } from "./YWing";
import { BWing } from "./BWing";
import { VWing } from "./VWing";

export function Ship ({ model, ...props }) {

    return (
        {
            'Y-wing': <YWing {...props} />,
            'X-wing': <XWing {...props} />,
            'A-wing': <AWing {...props} />,
            'B-wing': <BWing {...props} />,
            'V-wing': <VWing {...props} />,
        }[model]
    );
}