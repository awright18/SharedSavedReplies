const createPathElement = (coords, fill) => {
    let xmlns = "http://www.w3.org/2000/svg";
    let path = document.createElementNS(xmlns,"path");
    path.setAttributeNS(null, "d", coords);
    path.setAttributeNS(null,"fill", fill);
    return path;
}

const createElipsisSvg = () => {

    let boxWidth = 20;
    let boxHeight = 20;
    let xmlns = "http://www.w3.org/2000/svg";
    let svgElement = document.createElementNS(xmlns, "svg");
    svgElement.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
    svgElement.setAttributeNS(null, "width", boxWidth);
    svgElement.setAttributeNS(null, "height", boxHeight);
 
    let firstPathCoords = "M2.70833 12.7077C4.2041 12.7077 5.41667 11.4951 5.41667 9.99935C5.41667 8.50358 4.2041 7.29102 2.70833 7.29102C1.21256 7.29102 0 8.50358 0 9.99935C0 11.4951 1.21256 12.7077 2.70833 12.7077Z";
    let firstPathFill = "#007AFF";
    var firstPath = createElementPath(firstPathCoords,firstPathFill);

    svgElement.appendChild(firstPath);

    let secondPathCoords = "M10.0001 12.7077C11.4959 12.7077 12.7084 11.4951 12.7084 9.99935C12.7084 8.50358 11.4959 7.29102 10.0001 7.29102C8.50431 7.29102 7.29175 8.50358 7.29175 9.99935C7.29175 11.4951 8.50431 12.7077 10.0001 12.7077Z";
    let secondPathFill = "#007AFF";
    var secondPath = createElementPath(secondPathCoords,secondPathFill);

    svgElement.appendChild(secondPath);

    let thirdPathCoords = "M17.2916 12.7077C18.7874 12.7077 19.9999 11.4951 19.9999 9.99935C19.9999 8.50358 18.7874 7.29102 17.2916 7.29102C15.7958 7.29102 14.5833 8.50358 14.5833 9.99935C14.5833 11.4951 15.7958 12.7077 17.2916 12.7077Z";
    let thirdPathFill = "#007AFF";
    var thirdPath = createElementPath(thirdPathCoords,thirdPathFill);

    svgElement.appendChild(thirdPath);

    return svgElement;
}