const stockDataService = require('../services/stockDataService');

exports.handler = async (event, context) => {
  const logger = context.logger || console;
  
  try {
    let result;
    let statusCode = 200;
    
    const path = event.path || event.rawPath || '/';
    const httpMethod = event.httpMethod || event.requestContext?.http?.method || 'GET';
    
    logger.info(`Request: ${httpMethod} ${path}`);
    
    if (path.includes('/api/stock/list')) {
      result = await stockDataService.getStockList();
    } else if (path.match(/\/api\/stock\/\w+/)) {
      const symbol = path.split('/').pop();
      result = await stockDataService.getStockData(symbol);
    } else if (path.includes('/api/market/overview')) {
      result = await stockDataService.getMarketOverview();
    } else {
      statusCode = 404;
      result = { error: 'Not Found', path: path };
    }
    
    return {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(result)
    };
    
  } catch (error) {
    logger.error('Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};

exports.stockList = async (event, context) => {
  try {
    const result = await stockDataService.getStockList();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};

exports.stockDetail = async (event, context) => {
  try {
    const symbol = event.pathParameters?.symbol || event.queryStringParameters?.symbol;
    if (!symbol) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Symbol is required' })
      };
    }
    
    const result = await stockDataService.getStockData(symbol);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};

exports.marketOverview = async (event, context) => {
  try {
    const result = await stockDataService.getMarketOverview();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};
