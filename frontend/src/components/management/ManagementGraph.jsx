import React, { PureComponent } from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';
  
    render() {
    const { managementVoList } = this.props;
    const formatDate = (dataString)=>{
        const date = new Date(dataString);
        return `${date.getFullYear().toString().substr(-2)}. ${date.getMonth()+1}`;
    }
    const price = (dateString)=>{
      return parseInt(dateString).toLocaleString();
  }
    const data = managementVoList.slice().reverse().map(vo=>({
        name: formatDate(vo.usagePeriod),
        일반관리비:vo.basicFee,
        세대사용료:vo.mainternanceFee,
        커뮤니티:vo.facilitiesFee,
        합계: parseInt(vo.basicFee) + parseInt(vo.mainternanceFee) + parseInt(vo.facilitiesFee)
    }));
    console.log(data.total);

      return (
        <ResponsiveContainer width="100%" height={300}>
                <ComposedChart
                    width={800}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickCount={4} tickFormatter={price}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="일반관리비" stackId="a" fill="#8884d8" barSize={40} />
                    <Bar dataKey="세대사용료" stackId="a" fill="#82ca9d" barSize={40} />
                    <Bar dataKey="커뮤니티" stackId="a" fill="#ebc447" barSize={40} />
                    <Line type="monotone" dataKey="합계" stroke="#f75650" strokeWidth={1.5}/>
                </ComposedChart>
            </ResponsiveContainer>
    );
}
}