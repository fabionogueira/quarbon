import { Meta, TProps, Page, Story, Header } from "@docs/components";
import { QDatePicker } from "@quarbon/ui";
import { Playground } from "@docs/components/Playground";


const propsDef: TProps = {
    id: {
        type: "string",
        default: ''
    },
    value: {
        type: "string",
        default: ""
    },
    onChange: {
        type: "event",
        default: "() => {}",
    },
    placeholder: {
        type: "string",
        default: " ",
    },
    labelText: {
        type: "string",
        default: " ",
    },
}

Meta.set({
    name: "Components/DatePicker",
    custom: DatePickerDocs
});

function DatePickerDocs() {
    return (
        <Page className="docs-datepicker">
            <Header component={QDatePicker} description="" />
            <Playground attributes={propsDef} component={QDatePicker} />

            <Story
                id="DatePicker.Basic"
                label="Basic"
                source={Basic}
            />
        </Page>
    )

    function Basic() {
        return (
            // @code=DatePicker.Basic
            <QDatePicker id={"1"} placeholder="dd/mm/yyyy" />
        )
    }
}