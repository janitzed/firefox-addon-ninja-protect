import React, { Component } from 'react';

import * as FileSaver from 'file-saver';

import getTranslations from '../../../Translations';

import addToStore from '../../Store/addToStore';

import customKey from '../Functions/customKey';

import getSecurityList from '../Functions/getSecurityList';

import { addonRoot } from '../Functions/addonPrefix';

class ModuleExport extends Component {

    public translations: {
        [ key: string ]: any
    };

    public state: {
        [ key: string ]: any
    };

    constructor(props) {
        super(props);
        this.saveToFileJson = this.saveToFileJson.bind(this);
        this.translations = getTranslations();
    }

    /**
     * Export all settings and global lists to an json file
     */
    saveToFileJson(keyName: string = 'all') {
        //@ts-ignore
        browser.runtime.sendMessage({
            action: 'export-dashboard',
            keyName
        })
            .then(response => {
                try {
                    var blob = new Blob([JSON.stringify(response)], { type: "application/json;charset=utf-8" });
                    FileSaver.saveAs(blob, `Protector-settings.json`);
                } catch (error) {
                    addToStore(`Error while creating Blob file. Error message: ${error}.` ,-1);
                }
            })
            .catch(() => {
                addToStore('Error while exporting data' ,-1);
            })
    }

    render() {
        const list = getSecurityList();
        let boxStyle = {
            backgroundImage: `url(https://chat-manager.j.pl/public/images/eagle-1245681_1920.jpg`
        };

        return (
            <div className="Export">
                <div 
                    key={customKey()} 
                    className={`single-box single-box-11 box-root`}
                    onClick={(e) => this.saveToFileJson('all')} 
                >
                    <h1 className="h1-title">
                        {`${this.translations.export} ${this.translations.exportAll}`}
                    </h1>
                    <div className="image">
                        <img alt="icon" src={`${addonRoot()}/logo/shield-128.png`} />
                    </div>
                </div>
                {
                    list.map( (listObject: {name: string, img: string, translated: string}, index) => {
                        boxStyle = {
                            backgroundImage: `url(https://chat-manager.j.pl/public/images/${listObject.img})`
                        };

                        return (
                            <div 
                                key={customKey()} 
                                className={`single-box single-box-${index}`}
                                onClick={(e) => this.saveToFileJson(listObject.name)} 
                            >
                                <h1 className="h1-title">
                                    {`${this.translations.export}: ${listObject.translated}`}
                                </h1>
                                <div className="image" style={boxStyle}></div>
                            </div>
                        )
                    })   
                }
            </div>
        );
    }
}

export default ModuleExport;