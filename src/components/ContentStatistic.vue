<template>
<div>
    <h2>博文统计{{title}}</h2>
    <div style="display:flex ">
        <div class="chart" id="container"></div>
        <div class="chart" id="container1"></div>
    </div>
</div>
    
    
</template>

<script>
   import { Chart } from '@antv/g2';
   import DataSet from '@antv/data-set';
    export default {
        data(){
            return {
                title:"g2绘图"
            }
        },
        mounted(){
            const data1 = [
            { year: 'JavaScript', sales: this.$store.state.javascriptArticles.length },
            { year: 'CSS', sales: this.$store.state.cssArticles.length },
            { year: 'HTML', sales: this.$store.state.htmlArticles.length },
            { year: 'Node', sales: this.$store.state.nodeArticles.length },
            { year: 'Koa', sales: this.$store.state.koaArticles.length },
            { year: 'Vue', sales: this.$store.state.vueArticles.length },
            { year: 'React', sales: this.$store.state.reactArticles.length },
            { year: 'Other', sales: this.$store.state.otherArticles.length },
            ];
            //1创建chart工具
            const chart1 = new Chart({
            container: 'container',
            // autoFit: true,
            width:500,
            height: 400,
            });
            //2为chart装在数据
            chart1.data(data1);
            
            //3设置chart的数据
            chart1.scale('sales', {
            nice: true,
            });
            //4
            chart1.tooltip({
            showMarkers: false
            });
            chart1.interaction('active-region');
            //5
            chart1.interval().position('year*sales');
            //6  渲染图
            chart1.render();
            

            //第二幅图
            // const data = [
            // { name: '狮子', type: '火象星座', value: 11 },
            // { name: '白羊', type: '火象星座', value: 10 },
            // { name: '射手', type: '火象星座', value: 10 },
            // { name: '水瓶', type: '风向星座', value: 14 },
            // { name: '双子', type: '风向星座', value: 7 },
            // { name: '天平', type: '风向星座', value: 7 },
            // { name: '摩羯', type: '土象星座', value: 14 },
            // { name: '金牛', type: '土象星座', value: 3 },
            // { name: '处女', type: '土象星座', value: 3 },
            // { name: '天蝎', type: '水象星座', value: 11 },
            // { name: '巨蟹', type: '水象星座', value: 5 },
            // { name: '双鱼', type: '水象星座', value: 5 },
            // ];
            const data = [
            { name: 'HTML', type: '前端', value: this.$store.state.htmlArticles.length },
            { name: 'JavaScript', type: '前端', value: this.$store.state.javascriptArticles.length },
            { name: 'CSS', type: '前端', value: this.$store.state.cssArticles.length },
            { name: 'Node', type: '后端', value: this.$store.state.nodeArticles.length },
            { name: 'Koa', type: '后端', value: this.$store.state.koaArticles.length },
            { name: 'Vue', type: '框架', value: this.$store.state.vueArticles.length },
            { name: 'React', type: '框架', value: this.$store.state.reactArticles.length },
            { name: 'Other', type: '其他', value: this.$store.state.otherArticles.length},
            ];
            const ds = new DataSet();
            const dv = ds.createView();
            dv.source(data).transform({
            type: 'percent',
            field: 'value',
            dimension: 'type',
            as: 'percent',
            });

            const colorMap = {
            前端: '#1890ff',
            后端: '#13c2c2',
            框架: '#ffc53d',
            其他: '#73d13d',
            };

            const chart = new Chart({
            container: 'container1',
            // autoFit: true,
            width:400,
            height: 500,
            });
            chart.data(dv.rows);
            chart.legend(false);
            chart.coordinate('theta', {
            radius: 0.5,
            innerRadius: 0.3,
            });
            chart.tooltip({
            showMarkers: false
            });
            chart
            .interval()
            .adjust('stack')
            .position('percent')
            .color('type', (val) => colorMap[val])
            .style({
                stroke: 'white',
                lineWidth: 1,
            })
            .label('type', {
                offset: -5,
                style: {
                fill: 'white',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)',
                },
            });

            const ds2 = new DataSet();
            const dv2 = ds2.createView();
            dv2.source(data).transform({
            type: 'percent',
            field: 'value',
            dimension: 'name',
            as: 'percent',
            });
            const outterView = chart.createView();
            outterView.data(dv2.rows);
            outterView.coordinate('theta', {
            innerRadius: 0.5 / 0.8,
            radius: 0.8,
            });
            outterView
            .interval()
            .adjust('stack')
            .position('percent')
            .color('type*name', (type, name) => colorMap[type])
            .style({
                stroke: 'white',
                lineWidth: 1,
            })
            .label('name', {
                offset: -10,
                style: {
                fill: 'white',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)',
                },
            });

            chart.interaction('element-active')

            chart.render();
      
           
        }
    }
</script>


<style>
#container{
    
}
.chart{
    flex:1;
}
</style>
