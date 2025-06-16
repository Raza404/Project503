import React from 'react';

const AnalyticsChart = ({ data, title, type = 'bar' }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  const renderBarChart = () => (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>{title}</h3>
      <div style={styles.barChart}>
        {data.map((item, index) => (
          <div key={index} style={styles.barContainer}>
            <div 
              style={{
                ...styles.bar,
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || '#3498db'
              }}
            >
              <span style={styles.barValue}>{item.value}</span>
            </div>
            <span style={styles.barLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLineChart = () => (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>{title}</h3>
      <div style={styles.lineChart}>
        <svg width="100%" height="200" style={styles.svg}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y * 2}
              x2="100%"
              y2={y * 2}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          ))}
          
          {/* Line path */}
          <polyline
            fill="none"
            stroke="#3498db"
            strokeWidth="3"
            points={data.map((item, index) => 
              `${(index / (data.length - 1)) * 100}%,${200 - (item.value / maxValue) * 180}`
            ).join(' ')}
          />
          
          {/* Data points */}
          {data.map((item, index) => (
            <circle
              key={index}
              cx={`${(index / (data.length - 1)) * 100}%`}
              cy={200 - (item.value / maxValue) * 180}
              r="4"
              fill="#3498db"
              stroke="white"
              strokeWidth="2"
            >
              <title>{`${item.label}: ${item.value}`}</title>
            </circle>
          ))}
        </svg>
        
        {/* Labels */}
        <div style={styles.lineLabels}>
          {data.map((item, index) => (
            <span key={index} style={styles.lineLabel}>{item.label}</span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return (
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>{title}</h3>
        <div style={styles.pieChart}>
          <svg width="200" height="200" style={styles.pieSvg}>
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (item.value / total) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              currentAngle += angle;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color || `hsl(${index * 60}, 70%, 60%)`}
                  stroke="white"
                  strokeWidth="2"
                >
                  <title>{`${item.label}: ${item.value} (${percentage.toFixed(1)}%)`}</title>
                </path>
              );
            })}
          </svg>
          
          <div style={styles.pieLegend}>
            {data.map((item, index) => (
              <div key={index} style={styles.legendItem}>
                <div 
                  style={{
                    ...styles.legendColor,
                    backgroundColor: item.color || `hsl(${index * 60}, 70%, 60%)`
                  }}
                />
                <span>{item.label}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  switch (type) {
    case 'line':
      return renderLineChart();
    case 'pie':
      return renderPieChart();
    default:
      return renderBarChart();
  }
};

const styles = {
  chartContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    margin: '20px 0'
  },
  chartTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2c3e50',
    fontSize: '18px'
  },
  barChart: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-around',
    height: '200px',
    padding: '20px 0'
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    margin: '0 5px'
  },
  bar: {
    width: '40px',
    minHeight: '10px',
    borderRadius: '4px 4px 0 0',
    position: 'relative',
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  barValue: {
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  barLabel: {
    marginTop: '10px',
    fontSize: '12px',
    color: '#7f8c8d',
    textAlign: 'center'
  },
  lineChart: {
    position: 'relative'
  },
  svg: {
    border: '1px solid #ecf0f1',
    borderRadius: '8px'
  },
  lineLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px'
  },
  lineLabel: {
    fontSize: '12px',
    color: '#7f8c8d'
  },
  pieChart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  pieSvg: {
    margin: '10px'
  },
  pieLegend: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  legendColor: {
    width: '16px',
    height: '16px',
    borderRadius: '50%'
  }
};

export default AnalyticsChart;