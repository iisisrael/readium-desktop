// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as qs from "query-string";
import * as React from "react";
import { connect } from "react-redux";
import { IOpdsPublicationView, IOpdsResultView } from "readium-desktop/common/views/opds";
import { DisplayType } from "readium-desktop/renderer/components/opds/Header";
import { GridView } from "readium-desktop/renderer/components/utils/GridView";
import { ListView } from "readium-desktop/renderer/components/utils/ListView";
import Loader from "readium-desktop/renderer/components/utils/Loader";
import { RootState } from "readium-desktop/renderer/redux/states";

import PageNavigation from "./PageNavigation";

interface IBaseProps {
    opdsPublicationView: IOpdsPublicationView[] | undefined;
    links: IOpdsResultView["links"];
    pageInfo?: IOpdsResultView["metadata"];
}

// IProps may typically extend:
// RouteComponentProps
// ReturnType<typeof mapStateToProps>
// ReturnType<typeof mapDispatchToProps>
// tslint:disable-next-line: no-empty-interface
interface IProps extends IBaseProps, ReturnType<typeof mapStateToProps> {
}

class EntryPublicationList extends React.Component<IProps, undefined> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        let displayType = DisplayType.Grid;

        if (this.props.location) {
            const parsedResult = qs.parse(this.props.location.search);

            if (parsedResult.displayType === DisplayType.List) {
                displayType = DisplayType.List;
            }
        }

        return (
            <>
                {this.props.opdsPublicationView ?
                    <>
                        {displayType === DisplayType.Grid ?
                            <GridView
                                normalOrOpdsPublicationViews={this.props.opdsPublicationView}
                                isOpdsView={true}
                            /> :
                            <ListView
                                normalOrOpdsPublicationViews={this.props.opdsPublicationView}
                                isOpdsView={true}
                            />
                        }
                        <PageNavigation
                            pageLinks={this.props.links}
                            pageInfo={this.props.pageInfo}
                        />
                    </>
                    : <Loader />}
            </>
        );
    }
}

const mapStateToProps = (state: RootState, _props: IBaseProps) => ({
    location: state.router.location,
});

export default connect(mapStateToProps)(EntryPublicationList);
