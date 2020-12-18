export const uriDecodeHelper = function(encodedURI) {
    return encodedURI ? decodeURIComponent(encodedURI) : ''
}

export const shuffleArrayHelper = function(array) {
    return array.sort(() => Math.random() - 0.5 );
}

export const combineArrayHelper = function( parentArray, childArray ) {
    return parentArray.concat( childArray )
}

export const calcPercentHelper = function( small, big ) {
    return ( small && big ) ? Math.ceil( small / big * 100 ) : 0
}

