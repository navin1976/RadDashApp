cd ../peachdashboardapi
echo "killing process on 1338"
kill -9 $(lsof -t -i:1338) &> /dev/null
echo "Starting sails in test mode"
NODE_ENV=test sails lift &> ../test.log &
sleep 15
cd -
echo "Starting test runner"
node mocha.js
kill -9 $(lsof -t -i:1338)
