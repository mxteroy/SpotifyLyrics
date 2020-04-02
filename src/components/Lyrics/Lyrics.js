import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default function Lyrics(props) {
    return <div>{ReactHtmlParser(props.lyrics)}</div>
}
