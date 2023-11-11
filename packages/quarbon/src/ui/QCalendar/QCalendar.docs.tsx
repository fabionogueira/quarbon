import {Meta, TProps, Page, Story, Header} from "@docs/components";
import {QCalendar} from "@quarbon/ui";
import {Playground} from "@docs/components/Playground";

const propsDef:TProps = {
    checked: {
        type: "boolean",
        default: true
    },
    onSelectDate: {
        type: "event"
    },
    name: {
        type: "string",
        control: false
    },
    rules: {
        type: "any",
        control: false
    },
    value: {
        type: "Date",
        control: false
    },
    skeleton: {
        type: "boolean"
    },
};

Meta.set({
    name: "Components/Calendar",
    custom: CalendarDocs
});

function CalendarDocs() {
    return (
        <Page className="docs-calendar">
            <Header component={QCalendar} description="" />
            <Playground attributes={propsDef} component={QCalendar} />

            <Story
                id="Calendar.Basic"
                label="Basic"
                source={Basic}
            />

        </Page>
    );
}

function Basic() {
    return (
        // @code=Calendar.Basic
        <QCalendar />
        // @code
    )
}