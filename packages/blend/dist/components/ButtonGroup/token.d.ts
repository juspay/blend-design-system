declare const buttonGroupTokens: {
    container: {
        display: string;
        alignItems: string;
    };
    spacing: {
        sm: string;
        md: string;
        lg: string;
    };
    borderRadius: string;
    stacked: {
        positions: {
            first: {
                borderTopRightRadius: string;
                borderBottomRightRadius: string;
                borderRight: string;
            };
            middle: {
                borderRadius: string;
                borderRight: string;
            };
            last: {
                borderTopLeftRadius: string;
                borderBottomLeftRadius: string;
            };
        };
    };
};
export default buttonGroupTokens;
