const createSavedRepliesSidePanelDiv = (savedReplies) => {

    const expandSvgPath = "M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z";
    
    const copySvgPath = "M 4 2 C 2.895 2 2 2.895 2 4 L 2 17 C 2 17.552 2.448 18 3 18 C 3.552 18 4 17.552 4 17 L 4 4 L 17 4 C 17.552 4 18 3.552 18 3 C 18 2.448 17.552 2 17 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z";

    const repliesDiv = createElement("div",{
        children:[],
        className:""
    });

    for (const [i, reply] of savedReplies.entries()) {
        
        const savedReplyButton = 
                createElement("div",{
                    children:[
                        createElement("div",{
                            children:[
                                createElement("div",{
                                    children:[
                                        createElement("div",{
                                            children:[
                                                createElement("div",{
                                                    children:[
                                                        createElement("div",{
                                                            children:[
                                                                createElement("button",{
                                                                    children:[
                                                                        createElement("svg",{
                                                                            children:[
                                                                                createElement("rect",{
                                                                                    children:[],
                                                                                    width:"24",
                                                                                    height:"24",
                                                                                    stroke:"none",
                                                                                    fill:"#000000",
                                                                                    opacity:"0"
                                                                                }),
                                                                                createElement("g",{
                                                                                    children:[
                                                                                        createElement("path",{
                                                                                            children:[],
                                                                                            style:"stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;",
                                                                                            transform:"translate(-12, -12)",
                                                                                            d:copySvgPath,
                                                                                            "stroke-linecap":"round"
                                                                                        })
                                                                                    ],
                                                                                    transform:"matrix(1 0 0 1 12 12)"
                                                                                })
                                                                            ],
                                                                            width:"20",
                                                                            height:"20",
                                                                            viewBox:"0 0 24 24",
                                                                            xmlns:"http://www.w3.org/2000/svg",
                                                                            "xlmns:xlink":"http://www.w3.org/1999/xlink"
                                                                        })
                                                                    ],
                                                                    className:"saved-replies-copy-button",
                                                                    type:"button",
                                                                    tabindex:"-1",
                                                                    onclick:"copySavedReplyTemplate(this)"
                                                                })
                                                            ],
                                                            className:"saved-replies-button-icon-inner-container"
                                                        })
                                                    ],
                                                    className:"saved-replies-button-icon-container"
                                                }),
                                                createElement("div",{
                                                    children:[
                                                        createElement("div",{
                                                            children:[
                                                                createElement("div",{
                                                                    children:[
                                                                        createElement("div",{
                                                                            children:[reply.name],
                                                                             className:"saved-replies-button-heder-text"
                                                                        }),                                                 
                                                                    ],
                                                                    className:"saved-replies-button-header"
                                                                })
                                                            ],
                                                            className:"saved-replies-button-content-inner-container"
                                                        })
                                                    ],
                                                    className:"saved-replies-button-content-outer-container"
                                                })   
                                            ],
                                            className:"saved-replies-button"
                                        })
                                    ],
                                    className:"saved-replies-button-container"
                                }),
                                createElement("div",{
                                    children:[
                                        createElement("div",{
                                            children:[
                                                createElement("div",{
                                                    children:[
                                                        createElement("button",{
                                                            children:[
                                                                createElement("svg",{
                                                                    children:[
                                                                        createElement("path",{
                                                                            children:[],
                                                                            id:"XMLID_102_",
                                                                            d:expandSvgPath
                                                                        })
                                                                    ],
                                                                    fill:"#000000",
                                                                    height:"16",
                                                                    width:"16",
                                                                    version:"1.1",
                                                                    id:"expand",
                                                                    xlmns:"http://www.w3.org/2000/svg",
                                                                    "xmlns:link":"http://www.w3.org/1999/xlink",
                                                                    viewBox:"0 0 330 300"
                                                                })
                                                            ],
                                                            className:"saved-replies-expand-button",
                                                            type:"button",
                                                            tabindex:"-1",
                                                            onclick:"toggleTemplateVisibility(this)"
                                                        })
                                                    ]
                                                })
                                            ],
                                            className:"saved-replies-action-items-inner-container"
                                        })
                                    ],
                                    className:"saved-replies-action-items-container"
                                })
                            ],
                            className:"saved-replies-container"
                        }),
                        createElement("div",{
                            children:[
                                createElement("div",{
                                    children:[
                                        createElement("pre",{
                                            children:[
                                                createElement("code",{
                                                    children:[reply.body],
                                                    className:"language-markdown"
                                                })
                                            ]
                                        })
                                    ],
                                    className:"saved-replies-template-body"
                                })
                            ],
                            className:"saved-replies-template-container"
                        })
                    ],
                    "data-saved-replies-name":reply.name
                });
       
         repliesDiv.append(savedReplyButton)
    }
    
    return repliesDiv;
}