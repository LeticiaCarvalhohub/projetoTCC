window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title: {
            text: "Compras semanais"
        },
        data: [
            {
                // Change type to "bar", "area", "spline", "pie", etc.
                type: "column",
                dataPoints: [
                    { label: "Semana 1", y: 10 },
                    { label: "Semana 2", y: 15 },
                    { label: "Semana 3", y: 25 },
                    { label: "Semana 4", y: 30 },
                ]
            }
        ]
    });
    chart.render();
}
