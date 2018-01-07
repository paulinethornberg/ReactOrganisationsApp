import {  ContentItem } from 'kentico-cloud-delivery-typescript-sdk';

export class Organisation extends ContentItem {
    constructor(){
        super({
            propertyResolver: ((fieldName) => {
                if (fieldName === 'name'){
                    return 'name';
                }
                if (fieldName === 'description'){
                    return 'description';
                }
                if (fieldName === 'website'){
                    return 'website';
                }
                 if (fieldName === 'facebook'){
                    return 'facebook';
                }
                 if (fieldName === 'image'){
                    return 'image';
                }
                  if (fieldName === 'postdate'){
                    return 'postdate';
                }
                if (fieldName === 'email'){
                    return 'email';
                }
                if (fieldName === 'phone'){
                    return 'phone';
                }
                if (fieldName === 'slug'){
                    return 'slug';
                }
            })
        })
    }

}