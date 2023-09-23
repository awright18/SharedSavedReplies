
import {createElement} from `../../js/modules/create-element.js`;

const createReplyElement = () => {
    const replyElement = 
        createElement(`div`,{
            childern:[
                createElement(`div`,{
                    children:[
                        createElement(`div`,{
                            childern:[
                                createElement(`div`,{
                                    childern:[
                                        createElement(`button`,{
                                            childern:[
                                                createElement(`div`,{
                                                    children:[

                                                    ],
                                                    className:``
                                                }),                                                                                ,                                
                                            ],
                                            className:`button`,
                                            tabindex:`0`,
                                            type:`button`
                                        }),
                                    ],
                                    className:``
                                }),
                            ],
                            className:``
                        }),
                    ],
                    className:``
                }),
            ],
            className:``
        });

    return replyElement;
}