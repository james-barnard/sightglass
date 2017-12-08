# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171207200313) do

  create_table "component_states", force: :cascade do |t|
    t.integer "step_id"
    t.integer "component_id"
    t.string "state"
    t.integer "sequence_number"
  end

  create_table "components", force: :cascade do |t|
    t.integer "test_cell_id"
    t.string "name"
  end

  create_table "programs", force: :cascade do |t|
    t.string "purpose"
  end

  create_table "step_statuses", force: :cascade do |t|
    t.integer "step_id"
    t.integer "test_run_id"
    t.string "status"
    t.integer "started_at"
    t.integer "soaking_at"
    t.integer "completed_at"
  end

  create_table "steps", force: :cascade do |t|
    t.integer "program_id"
    t.string "description"
    t.integer "duration"
    t.integer "sequence_number"
  end

  create_table "test_cells", force: :cascade do |t|
    t.string "name"
  end

  create_table "test_runs", force: :cascade do |t|
    t.integer "test_cell_id"
    t.integer "program_id"
    t.string "name"
    t.integer "started_at"
    t.integer "completed_at"
    t.string "status_final"
  end

end
