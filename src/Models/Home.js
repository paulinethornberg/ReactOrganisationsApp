import {  ContentItem } from 'kentico-cloud-delivery-typescript-sdk';

export class Home extends ContentItem {

    constructor(){
        super({
            propertyResolver: ((fieldName) => {


                if (fieldName === 'our_story'){
                    return 'ourStory';
                }

                if (fieldName === 'slug'){
                    return 'urlPattern';
                }

            })
        })
    }

}