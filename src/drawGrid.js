import { ctx } from "./elements";

function drawGrid(grid) {

    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";

    for(var i = 1; i * grid < sim.box.height; i++ ) {

        ctx.beginPath();
        ctx.moveTo(0, i * grid);
        ctx.lineTo(sim.box.width, i*grid);
        ctx.stroke();
    }


    for(var i = 1; i * grid < sim.box.width; i++ ) {
        ctx.beginPath();
        ctx.moveTo(i * grid, 0);
        ctx.lineTo(i * grid, sim.box.height);
        ctx.stroke();
    }

}

export default drawGrid;