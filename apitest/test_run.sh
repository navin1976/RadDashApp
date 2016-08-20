cd ../peachdashboardapi
echo "killing process on 1338"
kill -9 $(lsof -t -i:1338) &> /dev/null
echo "Starting sails in test mode"
NODE_ENV=test sails lift &> ../test.log &
sleep 15
cd ../apitest
echo "Starting test runner"
node ./node_modules/mocha/bin/mocha tests/**/*-test.js
kill -9 $(lsof -t -i:1338)
