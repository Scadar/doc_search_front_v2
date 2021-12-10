export const standardShadow = {
    boxShadow: "0 2px 6px 0 rgba(136, 148, 171, 0.2), 0 24px 20px -24px rgba(71, 82, 107, 0.1)"
};

type AlignItemsType = "flex-start" | "flex-end" | "center";
type JustifyContentType = "center" | "flex-start" | "flex-end" | "space-around" | "space-between";
type FlexDirectionType = "row" | "row-reverse" | "column" | "column-reverse";

export const flexStyles = (
    alignItems?: AlignItemsType | undefined,
    justifyContent?: JustifyContentType | undefined,
    flexDirection?: FlexDirectionType | undefined
) => {
    return {
        display: "flex",
        alignItems,
        justifyContent,
        flexDirection
    };
};