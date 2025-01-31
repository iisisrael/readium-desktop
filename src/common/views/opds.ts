// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { Identifiable } from "../models/identifiable";
import { IHttpGetResult } from "../utils/http";

export interface IOpdsFeedView extends Identifiable {
    title: string;
    url: string;
}

export interface IOpdsCoverView {
    coverLinks: IOpdsLinkView[];
    thumbnailLinks: IOpdsLinkView[];
}

export interface IOpdsPublicationView {
    baseUrl: string;
    r2OpdsPublicationBase64?: string;
    title: string;
    authors: string[];
    publishers?: string[];
    workIdentifier?: string;
    description?: string;
    tags?: string[];
    languages?: string[];
    publishedAt?: string; // ISO8601
    entryLinks?: IOpdsLinkView[];
    buyLinks?: IOpdsLinkView[];
    borrowLinks?: IOpdsLinkView[];
    subscribeLinks?: IOpdsLinkView[];
    sampleOrPreviewLinks?: IOpdsLinkView[];
    openAccessLinks?: IOpdsLinkView[];
    cover?: IOpdsCoverView;
}

export interface IOpdsNavigationLinkView {
    title: string;
    subtitle?: string;
    url: string;
    numberOfItems?: number;
}

export interface IOpdsFeedMetadataView {
    numberOfItems?: number;
    itemsPerPage?: number;
    currentPage?: number;
}

export interface IOpdsResultView {
    title: string;
    metadata?: IOpdsFeedMetadataView;
    navigation?: IOpdsNavigationLinkView[];
    publications?: IOpdsPublicationView[];
    links?: IOpdsNavigationLink;

    groups?: OpdsGroupView[];
    auth?: OpdsAuthView;
}

export interface OpdsGroupView {
    title: string;
    navigation?: IOpdsNavigationLinkView[];
    publications?: IOpdsPublicationView[];
}

export interface OpdsAuthView {
    logoImageUrl: string;

    labelLogin: string;
    labelPassword: string;

    oauthUrl: string;
    oauthRefreshUrl: string;
}

export interface IOpdsLinkView {
    url: string;
    title?: string | undefined;
    type?: string | undefined;
}

export interface IOpdsNavigationLink {
    next: IOpdsLinkView[];
    previous: IOpdsLinkView[];
    first: IOpdsLinkView[];
    last: IOpdsLinkView[];
    start: IOpdsLinkView[];
    up: IOpdsLinkView[];
    search: IOpdsLinkView[];
    bookshelf: IOpdsLinkView[];
    text: IOpdsLinkView[];
    self: IOpdsLinkView[];
}

export type THttpGetOpdsResultView = IHttpGetResult<string, IOpdsResultView>;
export type THttpGetOpdsPublicationView = IHttpGetResult<string, IOpdsPublicationView | undefined>;
