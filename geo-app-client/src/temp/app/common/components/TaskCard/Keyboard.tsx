import { ArrowUpOutlined, RollbackOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";

type Props = { value: string; inputHandler: (v: string) => void };

export default function Keyboard({ inputHandler, value }: Props) {
    const [isShift, setIsShift] = useState(false);
    const s = (noShift: string, shift: string) => (isShift ? shift : noShift);
    const letterRows = [
        ["ქ", s("წ", "ჭ"), "ე", s("რ", "ღ"), s("ტ", "თ"), "ყ", "უ", "ი", "ო", "პ", <RollbackOutlined name="BACKSPACE" />],
        [<ArrowUpOutlined name="SHIFT" />, "ა", s("ს", "შ"), "დ", "ფ", "გ", "ჰ", s("ჯ", "ჟ"), "კ", "ლ"],
        ["SPACE", s("ზ", "ძ"), "ხ", s("ც", "ჩ"), "ვ", "ბ", "ნ", "მ"],
    ];

    const onClick = (input: string | any) => {
        let key = input;
        if (typeof input === "object") {
            key = input.props.name;
        }

        const actions: Record<string, () => void> = {
            SHIFT: () => setIsShift(!isShift),
            BACKSPACE: () => inputHandler(value.substring(0, value.length - 1)),
            SPACE: () => inputHandler(value + " "),
        };

        const action = actions[key];
        action ? action() : inputHandler(value + key);
    };

    const renderRow = (row: (string | React.ReactNode)[], index: number) => {
        const r = row.map((letter, i) => (
            <div key={i + "row"} className="col">
                <button
                    className="min-w-[27px] py-2 px-4 text-lg"
                    onClick={() => onClick(letter)}
                >
                    {letter}
                </button>
            </div>
        ));
        return <div key={index} className="flex space-x-4">{r}</div>;
    };

    const renderGrid = () => (
        <div className="flex flex-col justify-center items-center">
            {letterRows.map(renderRow)}
        </div>
    );

    const mobileStyles: React.CSSProperties = {
        position: "absolute",
        left: window.innerWidth < 390 ? "-2.5rem" : "-1.25rem",
        right: window.innerWidth < 390 ? "-2.5rem" : "-1.25rem",
        top: "100%",
        zIndex: 1,
        padding: "0.5rem",
        borderRadius: 0,
    };

    if (isMobile) {
        return (
            <div style={mobileStyles} className="app-card">
                {renderGrid()}
            </div>
        );
    }
    return renderGrid();
}
