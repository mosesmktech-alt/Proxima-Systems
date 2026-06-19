INSERT INTO analytics_reports (
    report_id,
    generated_by,
    report_type,
    date_generated,
    high_risk_area,
    common_fault,
    incident_frequency,
    recommendation,
    reviewed_by
  )
VALUES (
    report_id:int,
    generated_by:int,
    'report_type:varchar',
    'date_generated:datetime',
    'high_risk_area:varchar',
    'common_fault:varchar',
    incident_frequency:int,
    'recommendation:text',
    reviewed_by:int
  );