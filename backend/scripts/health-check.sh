#!/bin/bash

# ========================================
# PATHFINDER BACKEND - HEALTH CHECK SCRIPT
# ========================================
# Este script verifica se o backend está funcionando corretamente
# Uso: ./scripts/health-check.sh [URL]
# Exemplo: ./scripts/health-check.sh https://api.pathfinder.com

set -e  # Exit on error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# URL base (pode ser passada como argumento)
BASE_URL="${1:-http://localhost:3001}"

echo "========================================="
echo "🏥 PATHFINDER BACKEND HEALTH CHECK"
echo "========================================="
echo "URL: $BASE_URL"
echo ""

# Contador de testes
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Função para fazer teste
test_endpoint() {
    local name="$1"
    local endpoint="$2"
    local expected_status="${3:-200}"
    local method="${4:-GET}"

    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    echo -n "Testing $name... "

    response=$(curl -s -w "\n%{http_code}" -X "$method" "$BASE_URL$endpoint" 2>&1)
    status_code=$(echo "$response" | tail -n1)

    if [ "$status_code" = "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $status_code)"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Expected $expected_status, got $status_code)"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

# Função para testar JSON response
test_json_field() {
    local name="$1"
    local endpoint="$2"
    local field="$3"
    local expected_value="$4"

    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    echo -n "Testing $name... "

    response=$(curl -s "$BASE_URL$endpoint")
    actual_value=$(echo "$response" | grep -o "\"$field\":\"[^\"]*\"" | cut -d'"' -f4)

    if [ "$actual_value" = "$expected_value" ]; then
        echo -e "${GREEN}✓ PASS${NC} ($field = $expected_value)"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Expected $expected_value, got $actual_value)"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

echo "📡 BASIC CONNECTIVITY"
echo "-------------------------------------"

# Test 1: Health endpoint
test_endpoint "Health Check" "/api/v1/health" 200

# Test 2: Health status field
test_json_field "Health Status" "/api/v1/health" "status" "healthy"

echo ""
echo "🧬 PERSONALITY TESTS API"
echo "-------------------------------------"

# Test 3: Frameworks endpoint
test_endpoint "List Frameworks" "/api/v1/personality-tests/frameworks" 200

# Test 4: MBTI Questions
test_endpoint "MBTI Questions" "/api/v1/personality-tests/frameworks/mbti/questions" 200

# Test 5: Big Five Questions
test_endpoint "Big Five Questions" "/api/v1/personality-tests/frameworks/bigfive/questions" 200

# Test 6: Personality Types
test_endpoint "List Types" "/api/v1/personality-tests/types" 200

# Test 7: Specific Type by Slug
test_endpoint "INTJ Type" "/api/v1/personality-tests/types/intj-arquiteto" 200

echo ""
echo "🔐 AUTHENTICATION"
echo "-------------------------------------"

# Test 8: Register endpoint exists (should return 400/409 without body, not 404)
echo -n "Testing Register Endpoint... "
status=$(curl -s -w "%{http_code}" -X POST "$BASE_URL/api/v1/auth/register" -o /dev/null)
if [ "$status" = "400" ] || [ "$status" = "409" ]; then
    echo -e "${GREEN}✓ PASS${NC} (Endpoint exists, returns $status)"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${YELLOW}⚠ WARNING${NC} (Got $status, expected 400 or 409)"
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

# Test 9: Login endpoint exists
echo -n "Testing Login Endpoint... "
status=$(curl -s -w "%{http_code}" -X POST "$BASE_URL/api/v1/auth/login" -o /dev/null)
if [ "$status" = "400" ] || [ "$status" = "401" ]; then
    echo -e "${GREEN}✓ PASS${NC} (Endpoint exists, returns $status)"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${YELLOW}⚠ WARNING${NC} (Got $status, expected 400 or 401)"
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

echo ""
echo "📄 CONTENT API"
echo "-------------------------------------"

# Test 10: Articles endpoint
test_endpoint "Articles List" "/api/v1/content/articles" 200

# Test 11: Categories endpoint
test_endpoint "Categories List" "/api/v1/content/categories" 200

# Test 12: Sitemap
test_endpoint "Sitemap XML" "/api/v1/content/sitemap.xml" 200

echo ""
echo "📚 DOCUMENTATION"
echo "-------------------------------------"

# Test 13: Swagger docs
test_endpoint "Swagger Docs" "/api/docs" 200 || echo -e "${YELLOW}⚠ Swagger pode estar desabilitado em produção${NC}"

echo ""
echo "========================================="
echo "📊 RESULTS SUMMARY"
echo "========================================="
echo -e "Total Tests:  $TOTAL_TESTS"
echo -e "Passed: ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed: ${RED}$FAILED_TESTS${NC}"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}✓ ALL TESTS PASSED!${NC}"
    echo "Backend is healthy and ready! 🚀"
    exit 0
else
    echo -e "${RED}✗ SOME TESTS FAILED${NC}"
    echo "Please check the logs and fix the issues."
    exit 1
fi
