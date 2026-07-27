const { createClient } = require("@supabase/supabase-js");

require("dotenv").config();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if (!url || !key) {
  module.exports = null;
} else {
  const supabase = createClient(url, key);
  module.exports = supabase;
}