rails g model test_cells name:string --no-timestamps
rails g model components  test_cell_id:integer name:string --no-timestamps
rails g model component_states step_id:integer component_id:integer state:string sequence_number:integer --no-timestamps
rails g model test_runs  test_cell_id:integer program_id:integer name:string started_at:integer completed_at:integer status_final:string --no-timestamps
rails g model programs  purpose:string --no-timestamps
rails g model steps  program_id:integer description:string duration:integer sequence_number:integer --no-timestamps
rails g model step_statuses  step_id:integer test_run_id:integer status:string started_at:integer soaking_at:integer completed_at:integer --no-timestamps
