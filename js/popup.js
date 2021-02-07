const getJj_init = function () {
    let jjCode = localStorage.getItem('jj_code');
    let timmer = '';
    let handdleCancel = function (val) {
        console.log(val);
    };
    let getData = val => {
        $.ajax({
            url: `https://api.doctorxiong.club/v1/fund?code=${val.toString()}`,
            success: function (res) {
                let htmlInner = '';
                res.data.map(item => {
                    htmlInner += `    <div class="list-group-item list-group-item-action" aria-current="true"><div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${item.name} <small>${item.code}</small></h5><a onclick="handdleCancel">取关</a>
                            </div><p class="mb-1">日涨幅:${item.dayGrowth}% 净值:${item.netWorth} 估值:${item.expectGrowth}%</p></div>`;
                });

                $('#jj-list-group').html(htmlInner);
            }
        });
    };
    if (jjCode && JSON.parse(jjCode)) {
        console.log(JSON.parse(jjCode));
        timmer = setTimeout(getData(JSON.parse(jjCode)), 50000);
    } else {
        console.log('error');
    }

    $('#jj-search-btn').click(function () {
        let val = $('#jj-search-input').val();
        if (val && val.length === 6) {
            console.log('val val val val');
            let newJjCode = JSON.parse(jjCode) || [];
            newJjCode.push(val);
            localStorage.setItem('jj_code', JSON.stringify(newJjCode));
            getData(newJjCode);
        }
        console.log('init');
    });
};
getJj_init();
