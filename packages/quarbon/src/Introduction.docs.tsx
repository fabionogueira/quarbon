import {Page, Meta} from "@docs/components";
import {QBadge} from "@quarbon/ui";

Meta.set({
    name: "Introduction",
    custom: IntroductionDocs,
});

export function IntroductionDocs() {
    return (
        <Page>
            <h1>Introduction</h1>
            <hr />

            <section>
                <h2>Typography</h2>
                <hr />
                <CSSDescription name="h1" sample={<h1>Headline 1</h1>}/>
                <CSSDescription name="h2" sample={<h2>Headline 2</h2>}/>
                <CSSDescription name="h3" sample={<h3>Headline 3</h3>}/>
                <CSSDescription name="h4" sample={<h4>Headline 4</h4>}/>
                <CSSDescription name="h5" sample={<h5>Headline 5</h5>}/>
                <CSSDescription name="h6" sample={<h6>Headline 6</h6>}/>
                <CSSDescription name="text-subtitle1" sample={<div className="text-subtitle1">Subtitle 1</div>}/>
                <CSSDescription name="text-subtitle2" sample={<div className="text-subtitle2">Subtitle 2</div>}/>
                <CSSDescription name="text-caption" sample={<div className="text-caption">Text Caption</div>}/>
                <CSSDescription name="text-overline" sample={<div className="text-overline">Text Overline</div>}/>
            </section>
        </Page>
    )
}

function CSSDescription(props:any) {

    return (
        <div className="row align-center" style={{marginBottom:20}}>
            <div style={{paddingRight:40, minWidth:150}}>
                <QBadge floating={false} buzz={false} rounded={false}>
                    {props.name}
                </QBadge>
            </div>
            <div>
                {props.sample}
            </div>
        </div>
    )
}
