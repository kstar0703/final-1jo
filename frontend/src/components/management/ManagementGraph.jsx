import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';
  
    render() {
    const { managementVoList } = this.props;
    const formatDate = (dataString)=>{
        const date = new Date(dataString);
        return `${date.getFullYear().toString().substr(-2)}. ${date.getMonth()+1}`;
    }
    const data = managementVoList.slice().reverse().map(vo=>({
        name: formatDate(vo.usagePeriod),
        일반관리비:vo.basicFee,
        세대사용료:vo.mainternanceFee,
        커뮤니티:vo.facilitiesFee
    }));
      return (
        <BarChart
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
          <YAxis barSize={50000} />
          <Tooltip />
          <Legend />
          <Bar dataKey="일반관리비" stackId="a" fill="#8884d8" />
          <Bar dataKey="세대사용료" stackId="a" fill="#82ca9d" />
          <Bar dataKey="커뮤니티" stackId="a" fill="#ebc447" />
        </BarChart>
      
    );
}
}