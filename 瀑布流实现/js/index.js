/**
 * Created by caopengfei on 2019/4/23.
 */
(function () {
    window.onload = function () {

        waterFall('main','dom');
        window.onscroll = function () {
            console.log('滚动了');
            if (checkWillLoadBox()){
                alert('33333');
                var imageData = {'image' : [{'icon':'asian-landscape.jpg'},
                    {'icon':'beach-style-landscape.jpg'},
                    {'icon':'contemporary-landscape.jpg'},
                    {'icon':'farmhouse-landscape.jpg'},
                    {'icon':'mediterranean-landscape.jpg'},
                    {'icon':'rustic-landscape.jpg'},
                    {'icon':'traditional-landscape.jpg'},
                    {'icon':'tropical-landscape.jpg'}]};
                    for (var i=0;i<imageData.image.length;i++){
                        var domBox = document.createElement('div');
                        domBox.className = 'dom';
                        var mainBox = document.getElementById('main');
                        mainBox.appendChild(domBox);

                        var picBox = document.createElement('div');
                        picBox.className = 'pic';
                        domBox.appendChild(picBox);

                        var pic = document.createElement('img');
                        pic.src = 'image/' + imageData.image[i].icon;
                        picBox.appendChild(pic);



                    }
                    waterFall('main','dom');
            }
        }
    };
    function waterFall (main,box) {
        var mainBox = document.getElementById(main);
        var childBox = document.getElementsByClassName(box);
        console.log(childBox);
        var  boxWidth = childBox[0].offsetWidth;
        var  windowWidth = document.body.clientWidth;
        var  cols =Math.floor(windowWidth/boxWidth);
        mainBox.style.width = boxWidth * cols + 'px';
        console.log(mainBox.style.width,boxWidth,windowWidth,cols);
        mainBox.style.margin = '0 auto';
        var heightArr = [];
        for (var i=0;i<childBox.length;i++){
            var  boxHeight = childBox[i].offsetHeight;
            if (i<cols){
                heightArr.push(boxHeight);
            }else {
                var minheight =getMinHeight(heightArr);
                var minIndex = getMinIndex(heightArr,minheight);
                var newBox = childBox[i];
                newBox.style.position = 'absolute';
                newBox.style.top = minheight + 'px';
                newBox.style.left = minIndex * boxWidth + 'px';
                heightArr[minIndex] += boxHeight;


            }
        }

    }
    function getMinHeight(arr) {
         var  minHeight = Math.min.apply(null,arr);
         return minHeight;
    }
    function getMinIndex(arr,height) {
        for(var i=0;i<arr.length;i++){
            if (arr[i]===height){
                return i;
            }
        }
    }
    function checkWillLoadBox() {
        var allBox = document.getElementsByClassName('dom');
        var lastBox = allBox[allBox.length-1];
        var  lastBoxheight = lastBox.offsetHeight;
        var lineHeight = 0.5 * lastBoxheight + lastBox.offsetTop;
        var rightLineHeight = document.body.clientHeight || document.documentElement.clientHeight;
        var scrollTopHeight = document.body.scrollTop|| document.documentElement.scrollTop;
        console.log(lineHeight,rightLineHeight,scrollTopHeight);
        return  (rightLineHeight+scrollTopHeight)>=lineHeight;
    }
})();