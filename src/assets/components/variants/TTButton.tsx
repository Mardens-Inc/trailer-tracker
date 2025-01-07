import {Button, extendVariants} from "@nextui-org/react";

export const TTButton = extendVariants(Button, {
    variants: {
        variant: {
            flat: "min-w-4 font-semibold"
        }
    },
    compoundVariants: [
        {
            variant: "flat",
            color: "primary",
            class: "text-primary bg-primary/20 hover:bg-primary/30 hover:opacity-1"
        },
        {
            variant: "flat",
            color: "secondary",
            class: "text-secondary bg-secondary/20 hover:bg-secondary/30"
        },
        {
            variant: "flat",
            color: "success",
            class: "text-success bg-success/20 hover:bg-success/30"
        },
        {
            variant: "flat",
            color: "warning",
            class: "text-warning bg-warning/20 hover:bg-warning/30"
        },
        {
            variant: "flat",
            color: "danger",
            class: "text-danger bg-danger/20 hover:!bg-danger/30  hover:opacity-1"
        }
    ],
    defaultVariants: {
        variant: "flat",
        color: "primary"
    }
});