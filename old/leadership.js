function more(index) {
    if (index === 1) {
        document.getElementById('onedown').style.display = 'block';
        document.getElementById('team-info-1').style.display = 'block';
        document.getElementById('down-arrow1').style.display = 'none';

    } else if (index === 2){
        document.getElementById('twodown').style.display = 'block';
        document.getElementById('team-info-2').style.display = 'block';
        document.getElementById('down-arrow2').style.display = 'none';

    } else if (index === 3) {
        document.getElementById('threedown').style.display = 'block';
        document.getElementById('team-info-3').style.display = 'block';
        document.getElementById('down-arrow3').style.display = 'none';

    }
}
function less(index) {
    if (index === 1) {
        document.getElementById('onedown').style.display = 'none';
        document.getElementById('team-info-1').style.display = 'none';
        document.getElementById('down-arrow1').style.display = 'block';
    } else if (index === 2){
        document.getElementById('twodown').style.display = 'none';
        document.getElementById('team-info-2').style.display = 'none';
        document.getElementById('down-arrow2').style.display = 'block';
    } else if (index === 3) {
        document.getElementById('threedown').style.display = 'none';
        document.getElementById('team-info-3').style.display = 'none';
        document.getElementById('down-arrow3').style.display = 'block';
    }
}