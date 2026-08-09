/* ==================== THEME (dark/light) ==================== */
function initTheme(){
  const saved=localStorage.getItem('eq_theme');
  const prefersDark=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark?'dark':'light');
  setTheme(theme,false);
}
function setTheme(theme,notify){
  document.documentElement.setAttribute('data-theme',theme);
  document.getElementById('themeToggle').innerHTML = theme==='dark'
    ? '<svg class="ico ico-md" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg class="ico ico-md" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  localStorage.setItem('eq_theme',theme);
  if(notify) showToast('info', t('theme_changed_title'), theme==='dark' ? t('theme_dark_body') : t('theme_light_body'));
}
function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme')==='dark' ? 'dark' : 'light';
  setTheme(cur==='dark'?'light':'dark', true);
}

/* ==================== LANGUAGE (TH/EN) ==================== */
const TRANSLATIONS={
  notif_title:{th:'การแจ้งเตือน',en:'Notifications'},
  view_all:{th:'ดูทั้งหมด',en:'View all'},
  profile_title:{th:'โปรไฟล์',en:'Profile'},
  profile_body:{th:'แสดงข้อมูลผู้ใช้ Admin (demo)',en:'Showing Admin user info (demo)'},
  account_settings:{th:'ตั้งค่าบัญชี',en:'Account settings'},
  logout:{th:'ออกจากระบบ',en:'Log out'},
  logout_title:{th:'ออกจากระบบ',en:'Logged out'},
  logout_body:{th:'ออกจากระบบเรียบร้อย (demo)',en:'You have been logged out (demo)'},
  nav_map:{th:'แผนที่เซนเซอร์',en:'Sensor Map'},
  nav_sensordata:{th:'ข้อมูลเซนเซอร์',en:'Sensor Data'},
  nav_alerts:{th:'การแจ้งเตือน',en:'Alerts'},
  nav_ai:{th:'การคาดการณ์ (AI)',en:'AI Prediction'},
  nav_sim:{th:'การจำลองเหตุการณ์',en:'Simulation'},
  nav_report:{th:'รายงาน',en:'Report'},
  nav_settings:{th:'ตั้งค่า',en:'Settings'},
  nav_help:{th:'คู่มือการใช้งาน',en:'Help'},
  map_title:{th:'แผนที่เซนเซอร์แบบเรียลไทม์',en:'Real-time Sensor Map'},
  f_all:{th:'แสดงทั้งหมด',en:'Show all'},
  f_alltype:{th:'ทุกประเภท',en:'All types'},
  s_ok:{th:'ปกติ',en:'Normal'},
  s_warn:{th:'เริ่มผิดปกติ',en:'Anomalous'},
  s_high:{th:'เสี่ยงสูง',en:'High risk'},
  s_danger:{th:'อันตราย',en:'Danger'},
  s_offline:{th:'ออฟไลน์',en:'Offline'},
  last_time:{th:'เวลาล่าสุด',en:'Last update'},
  vibration:{th:'แรงสั่นสะเทือน',en:'Vibration'},
  displacement:{th:'การเคลื่อนตัวดิน',en:'Ground displacement'},
  soil_moisture:{th:'ความชื้นดิน',en:'Soil moisture'},
  soil_pressure:{th:'ความดันใต้ดิน',en:'Soil pressure'},
  risk:{th:'ความเสี่ยง',en:'Risk'},
  risk_colon:{th:'ความเสี่ยง:',en:'Risk:'},
  area:{th:'พื้นที่:',en:'Area:'},
  view_detail:{th:'ดูรายละเอียด',en:'View details'},
  stat_total:{th:'เซนเซอร์ทั้งหมด',en:'Total sensors'},
  stat_online:{th:'ออนไลน์',en:'Online'},
  stat_offline:{th:'ออฟไลน์',en:'Offline'},
  stat_abnormal:{th:'เซนเซอร์ผิดปกติ',en:'Anomalous sensors'},
  stat_alerttoday:{th:'การแจ้งเตือนวันนี้',en:"Today's alerts"},
  chart_title:{th:'กราฟข้อมูลเซนเซอร์แบบเรียลไทม์',en:'Real-time Sensor Charts'},
  trend_24h:{th:'แนวโน้ม 24 ชม. (%)',en:'24h Trend (%)'},
  latest_sensor_status:{th:'สถานะเซนเซอร์ล่าสุด',en:'Latest Sensor Status'},
  filtering:{th:'กำลังกรอง:',en:'Filtering:'},
  clear_filter:{th:'ล้างตัวกรอง',en:'Clear filter'},
  location:{th:'ตำแหน่ง',en:'Location'},
  status:{th:'สถานะ',en:'Status'},
  th_vib:{th:'แรงสั่นสะเทือน (mm/s)',en:'Vibration (mm/s)'},
  th_disp:{th:'การเคลื่อนตัว (mm)',en:'Displacement (mm)'},
  th_moist:{th:'ความชื้น (%)',en:'Moisture (%)'},
  sim_title:{th:'เครื่องมือจำลองเหตุการณ์แผ่นดินไหว',en:'Earthquake Simulation Tool'},
  sim_event_type:{th:'ประเภทเหตุการณ์',en:'Event type'},
  sim_type_eq:{th:'จำลองแผ่นดินไหว',en:'Simulate earthquake'},
  sim_type_after:{th:'จำลองอาฟเตอร์ช็อก',en:'Simulate aftershock'},
  sim_depth:{th:'ความลึก (km)',en:'Depth (km)'},
  sim_dur:{th:'ระยะเวลา (s)',en:'Duration (s)'},
  sim_radius:{th:'พื้นที่ผลกระทบ (km)',en:'Impact radius (km)'},
  sim_start:{th:'เริ่มจำลอง',en:'Start simulation'},
  sim_stop:{th:'หยุด',en:'Stop'},
  sim_reset:{th:'รีเซ็ต',en:'Reset'},
  sim_ready:{th:'พร้อมจำลองเหตุการณ์',en:'Ready to simulate'},
  latest_alerts:{th:'การแจ้งเตือนล่าสุด',en:'Latest Alerts'},
  ai_footnote:{th:'อ้างอิงจากข้อมูลเซนเซอร์ 128 ตัว และโมเดล AI',en:'Based on 128 sensors and the AI model'},
  system_info:{th:'ข้อมูลระบบ',en:'System Info'},
  gateway_online:{th:'Gateway ออนไลน์',en:'Gateways online'},
  units:{th:'ตัว',en:'units'},
  data_packets:{th:'Data Packets',en:'Data Packets'},
  today:{th:'วันนี้',en:'today'},
  last_updated:{th:'อัปเดตล่าสุด',en:'Last updated'},
  system_normal:{th:'ระบบทำงานปกติ',en:'System operating normally'},
  data_sources:{th:'แหล่งข้อมูลที่ใช้ในการวิเคราะห์',en:'Data Sources Used in Analysis'},
  source_hint:{th:'คลิกที่แหล่งข้อมูลเพื่อเปิด/ปิดการใช้งานในการวิเคราะห์',en:'Click a data source to enable/disable it in the analysis'},
  alert_settings:{th:'ตั้งค่าการแจ้งเตือน',en:'Alert Settings'},
  email_alert:{th:'แจ้งเตือนทางอีเมล',en:'Email alerts'},
  line_alert:{th:'แจ้งเตือนทาง LINE',en:'LINE alerts'},
  browser_alert:{th:'แจ้งเตือนบนเบราว์เซอร์ (จริง)',en:'Browser notifications (real)'},
  save_settings:{th:'บันทึกการตั้งค่า',en:'Save settings'},
  test_notif:{th:'ทดสอบแจ้งเตือนจริง',en:'Send test notification'},
  settings_note:{th:'* อีเมลและ LINE ยังเป็นการจำลอง (demo) เนื่องจากต้องเชื่อมต่อ backend ส่วนการแจ้งเตือนบนเบราว์เซอร์ด้านบนเป็นการแจ้งเตือนจริงผ่าน Web Notification API ของเครื่องนี้',en:'* Email and LINE are still simulated (demo) since they require a backend. The browser notification above is a real notification via this device\'s Web Notification API.'},
  theme_changed_title:{th:'เปลี่ยนโหมดหน้าจอ',en:'Display mode changed'},
  theme_dark_body:{th:'เปลี่ยนเป็นโหมดมืดแล้ว',en:'Switched to dark mode'},
  theme_light_body:{th:'เปลี่ยนเป็นโหมดสว่างแล้ว',en:'Switched to light mode'},
  lang_changed_title:{th:'เปลี่ยนภาษา',en:'Language changed'},
  lang_changed_body:{th:'เปลี่ยนภาษาเป็นภาษาไทยแล้ว',en:'Language switched to English'},
  select_sensor:{th:'เลือกเซนเซอร์',en:'Sensor selected'},
  reset_done_title:{th:'รีเซ็ตแล้ว',en:'Reset complete'},
  reset_done_body:{th:'ค่าทั้งหมดถูกรีเซ็ตกลับสู่ค่าเริ่มต้น',en:'All values have been reset to defaults'},
  detail_title:{th:'รายละเอียดเซนเซอร์',en:'Sensor details'},
  no_abnormal:{th:'ยังไม่มีเหตุการณ์ผิดปกติ',en:'No abnormal event yet'},
  alert_detail_title:{th:'รายละเอียดการแจ้งเตือน (Alert)',en:'Alert Details'},
  alert_detail_title2:{th:'รายละเอียดการแจ้งเตือน',en:'Alert Details'},
  detail_area:{th:'พื้นที่',en:'Area'},
  detail_alert_time:{th:'เวลาแจ้งเตือน',en:'Alert time'},
  detail_mag:{th:'Magnitude คาดการณ์',en:'Predicted magnitude'},
  detail_depth:{th:'ความลึก',en:'Depth'},
  detail_dur:{th:'ระยะเวลาสั่นไหว',en:'Shaking duration'},
  detail_radius:{th:'รัศมีผลกระทบ',en:'Impact radius'},
  detail_eta:{th:'เวลาโดยประมาณก่อนเกิดเหตุ',en:'Estimated time before event'},
  detail_advice:{th:'คำแนะนำ: แจ้งเตือนประชาชนในพื้นที่เสี่ยง เตรียมพร้อมแผนอพยพ และตรวจสอบโครงสร้างอาคารสำคัญ',en:'Advice: alert residents in the risk area, prepare evacuation plans, and inspect critical building structures'},
  minutes:{th:'นาที',en:'min'},
  seconds:{th:'วินาที',en:'sec'},
  km:{th:'km',en:'km'},
  reset_note:{th:'ข้อมูลการตั้งค่าถูกรีเซ็ต',en:'Settings have been reset'},
  source_toggle_on:{th:'เปิดใช้งาน',en:'enabled'},
  source_toggle_off:{th:'ปิดใช้งาน',en:'disabled'},
  source_label:{th:'แหล่งข้อมูล',en:'Data source'},
  source_in_analysis:{th:'ในการวิเคราะห์',en:'in the analysis'},
  settings_saved_title:{th:'บันทึกการตั้งค่าแล้ว',en:'Settings saved'},
  settings_saved_body:{th:'การตั้งค่าการแจ้งเตือนถูกบันทึกเรียบร้อย',en:'Alert settings have been saved successfully'},
  sensor_detail_title:{th:'รายละเอียดเซนเซอร์',en:'Sensor Details'},
  detail_location:{th:'ตำแหน่ง',en:'Location'},
  detail_type:{th:'ประเภท',en:'Type'},
  detail_status:{th:'สถานะ',en:'Status'},
  detail_thai:{th:'ประเทศไทย',en:'Thailand'},
  report_title:{th:'รายงานสถานะระบบเฝ้าระวังแผ่นดินไหว',en:'Earthquake Monitoring System Status Report'},
  report_created:{th:'สร้างเมื่อ',en:'Generated at'},
  report_total:{th:'เซนเซอร์ทั้งหมด',en:'Total sensors'},
  report_online:{th:'ออนไลน์',en:'Online'},
  report_offline:{th:'ออฟไลน์',en:'Offline'},
  report_abnormal:{th:'เซนเซอร์ผิดปกติ',en:'Anomalous sensors'},
  report_alerts_today:{th:'การแจ้งเตือนวันนี้',en:"Today's alerts"},
  report_risk_score:{th:'AI Risk Score ปัจจุบัน',en:'Current AI Risk Score'},
  report_mag_pred:{th:'Magnitude Prediction',en:'Magnitude Prediction'},
  report_conf:{th:'Confidence',en:'Confidence'},
  report_sensor_list:{th:'รายการเซนเซอร์:',en:'Sensor list:'},
  report_downloaded_title:{th:'ดาวน์โหลดรายงานแล้ว',en:'Report downloaded'},
  report_downloaded_body:{th:'ไฟล์รายงานถูกบันทึกลงเครื่องของคุณ',en:'The report file has been saved to your device'},
  help_title:{th:'คู่มือการใช้งาน',en:'User Guide'},
  help_map_title:{th:'แผนที่เซนเซอร์:',en:'Sensor map:'},
  help_map_body:{th:'คลิกจุดบนแผนที่เพื่อดูรายละเอียดเซนเซอร์ ใช้ปุ่ม +/− เพื่อซูม และตัวกรองด้านบนเพื่อกรองตามสถานะ/ประเภท',en:'Click a point on the map to view sensor details. Use the +/− buttons to zoom, and the filters above to filter by status/type.'},
  help_stat_title:{th:'การ์ดสถิติ:',en:'Stat cards:'},
  help_stat_body:{th:'คลิกเพื่อกรองตารางสถานะเซนเซอร์ด้านล่าง',en:'Click to filter the sensor status table below'},
  help_sim_title:{th:'เครื่องมือจำลองเหตุการณ์:',en:'Simulation tool:'},
  help_sim_body:{th:'ปรับค่า Magnitude/ความลึก/ระยะเวลา/รัศมี แล้วกด "เริ่มจำลอง" ระบบจะยกระดับความเสี่ยงจนกระทั่งเกิดการแจ้งเตือนอัตโนมัติ พร้อมส่งอีเมล/LINE จำลอง',en:'Adjust Magnitude/Depth/Duration/Radius, then click "Start simulation". The system will raise the risk level until an alert fires automatically, along with a simulated email/LINE notification.'},
  help_settings_title:{th:'ตั้งค่าการแจ้งเตือน:',en:'Alert settings:'},
  help_settings_body:{th:'เปิด/ปิดช่องทางอีเมลและ LINE พร้อมกำหนดผู้รับ และเปิดการแจ้งเตือนจริงบนเบราว์เซอร์ได้',en:'Turn email and LINE channels on/off with recipients, and enable real browser notifications.'},
  help_report_title:{th:'รายงาน:',en:'Report:'},
  help_report_body:{th:'ดาวน์โหลดสรุปสถานะระบบปัจจุบันเป็นไฟล์ข้อความ',en:'Download a summary of the current system status as a text file'},
  notif_no_channel_title:{th:'ไม่ได้ส่งการแจ้งเตือน',en:'No notification sent'},
  notif_no_channel_body:{th:'ช่องทางอีเมลและ LINE ถูกปิดอยู่ในหน้าตั้งค่า',en:'Email and LINE channels are turned off in settings'},
  email_sent_title:{th:'ส่งอีเมลแจ้งเตือนแล้ว',en:'Alert email sent'},
  line_sent_title:{th:'ส่งข้อความ LINE แล้ว',en:'LINE message sent'},
  to_label:{th:'ถึง',en:'To'},
  no_email_set:{th:'(ยังไม่ได้ตั้งค่าอีเมล)',en:'(email not set)'},
  no_line_set:{th:'(ยังไม่ได้ตั้งค่า LINE ID)',en:'(LINE ID not set)'},
  detected_abnormal:{th:'ตรวจพบความผิดปกติที่',en:'Abnormality detected in'},
  predicted_size:{th:'ขนาดคาดการณ์',en:'estimated magnitude'},
  at_time:{th:'เวลา',en:'at'},
  eq_alert_prefix:{th:'แจ้งเตือน! ตรวจพบความผิดปกติในพื้นที่',en:'Alert! Anomaly detected in'},
  eq_within:{th:'มีโอกาสเกิดแผ่นดินไหวขนาด',en:'Possible earthquake of magnitude'},
  eq_within2:{th:'ภายใน',en:'within'},
  notif_perm_granted:{th:'อนุญาตแล้ว ✓',en:'Permission granted ✓'},
  notif_perm_denied:{th:'ถูกปฏิเสธ — เปิดในการตั้งค่าเบราว์เซอร์',en:'Denied — enable it in browser settings'},
  notif_perm_ask:{th:'คลิกสวิตช์เพื่อขออนุญาตแจ้งเตือน',en:'Click the switch to request notification permission'},
  notif_unsupported:{th:'เบราว์เซอร์นี้ไม่รองรับการแจ้งเตือน',en:"This browser doesn't support notifications"},
  test_notif_title:{th:'ทดสอบระบบแจ้งเตือน',en:'Notification system test'},
  test_notif_body:{th:'นี่คือการแจ้งเตือนทดสอบจากระบบเฝ้าระวังแผ่นดินไหว',en:'This is a test alert from the earthquake monitoring system'},
  eq_alert_title:{th:'แจ้งเตือนแผ่นดินไหว',en:'Earthquake Alert'},
  risk_low:{th:'ต่ำ',en:'Low'},
  risk_med:{th:'ปานกลาง',en:'Medium'},
  risk_high2:{th:'สูง',en:'High'},
  risk_vhigh:{th:'สูงมาก',en:'Very high'},
  risk_na:{th:'-',en:'-'},
  emailjs_hint:{th:'สมัครฟรีที่ emailjs.com แล้ว template ควรมีตัวแปร {{to_email}} {{area}} {{magnitude}} {{time}} {{message}}',en:'Sign up free at emailjs.com — your template should include the variables {{to_email}} {{area}} {{magnitude}} {{time}} {{message}}'},
  line_hint:{th:'LINE Notify ถูกปิดให้บริการแล้ว (31 มี.ค. 2025) ระบบนี้จึงใช้ LINE Messaging API (Push) แทน — ต้องสร้าง Channel ที่ LINE Developers Console เอง การเรียกจากเบราว์เซอร์โดยตรงอาจถูก CORS บล็อก หากส่งไม่สำเร็จให้ใช้ backend/proxy ช่วยส่งต่อ',en:'LINE Notify was discontinued on Mar 31, 2025, so this uses the LINE Messaging API (Push) instead — create a Channel in the LINE Developers Console. Calling it directly from the browser may be blocked by CORS; if sending fails, route it through a backend/proxy.'},
  ejs_not_configured:{th:'ยังไม่ได้กรอกค่า EmailJS ให้ครบ (Public Key / Service ID / Template ID)',en:'EmailJS is not fully configured (Public Key / Service ID / Template ID)'},
  line_not_configured:{th:'ยังไม่ได้กรอก LINE Channel Access Token หรือ User ID',en:'LINE Channel Access Token or User ID not set'},
  line_send_failed:{th:'ส่ง LINE ไม่สำเร็จ (อาจถูก CORS บล็อก) — ลองใช้ backend/proxy ช่วยส่ง',en:'LINE send failed (likely blocked by CORS) — try routing through a backend/proxy'},
  email_send_failed:{th:'ส่งอีเมลไม่สำเร็จ ตรวจสอบค่า EmailJS อีกครั้ง',en:'Email failed to send — please check your EmailJS settings'},
  auth_login_title:{th:'เข้าสู่ระบบ',en:'Sign in'},
  auth_login_sub:{th:'ระบบเฝ้าระวังแผ่นดินไหว — กรอกข้อมูลเพื่อเข้าใช้งาน',en:'Earthquake Monitoring System — sign in to continue'},
  auth_register_title:{th:'สมัครสมาชิก',en:'Create account'},
  auth_register_sub:{th:'สร้างบัญชีใหม่เพื่อเข้าใช้งานระบบ',en:'Create a new account to access the system'},
  auth_login_btn:{th:'เข้าสู่ระบบ',en:'Sign in'},
  auth_register_btn:{th:'สมัครสมาชิก',en:'Create account'},
  auth_no_account:{th:'ยังไม่มีบัญชี?',en:"Don't have an account?"},
  auth_has_account:{th:'มีบัญชีอยู่แล้ว?',en:'Already have an account?'},
  auth_switch_register:{th:'สมัครสมาชิก',en:'Sign up'},
  auth_switch_login:{th:'เข้าสู่ระบบ',en:'Sign in'},
  auth_err_empty:{th:'กรุณากรอก Username และ Password',en:'Please enter a username and password'},
  auth_err_short:{th:'Password ต้องมีอย่างน้อย 4 ตัวอักษร',en:'Password must be at least 4 characters'},
  auth_err_exists:{th:'มีชื่อผู้ใช้นี้อยู่แล้ว',en:'This username is already taken'},
  auth_err_invalid:{th:'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',en:'Incorrect username or password'},
  auth_registered_title:{th:'สมัครสมาชิกสำเร็จ',en:'Account created'},
  auth_registered_body:{th:'สร้างบัญชีเรียบร้อย เข้าสู่ระบบอัตโนมัติ',en:'Account created — signing you in'},
  welcome_back:{th:'ยินดีต้อนรับกลับ',en:'Welcome back'},
  logged_out_body2:{th:'ออกจากระบบเรียบร้อยแล้ว',en:'You have been signed out'},

  nav_subsidence:{th:'คาดการณ์ดินทรุด',en:'Land Subsidence'},
  subs_title:{th:'ระบบคาดการณ์ดินทรุดจากการจำลองสภาพอากาศ & ความชื้น',en:'Land Subsidence Prediction — Weather & Humidity Simulation'},
  subs_baseline_title:{th:'ค่าพื้นฐานสภาพอากาศ & ความชื้น (จำลองต่อเนื่อง)',en:'Weather & Humidity Baseline (continuous simulation)'},
  subs_soil_type_lbl:{th:'ประเภทดิน',en:'Soil type'},
  subs_soil_clay:{th:'ดินเหนียว (Clay)',en:'Clay'},
  subs_soil_peat:{th:'ดินพรุ/อินทรีย์ (Peat)',en:'Peat / organic soil'},
  subs_soil_loam:{th:'ดินร่วน (Loam)',en:'Loam'},
  subs_soil_sand:{th:'ดินทราย (Sand)',en:'Sand'},
  subs_horizon:{th:'ระยะเวลาคาดการณ์ (ปี)',en:'Forecast horizon (years)'},
  subs_rain:{th:'ปริมาณน้ำฝนจำลอง (mm/วัน)',en:'Simulated rainfall (mm/day)'},
  subs_humidity:{th:'ความชื้นในอากาศเฉลี่ย (%)',en:'Average air humidity (%)'},
  subs_temp:{th:'อุณหภูมิเฉลี่ย (°C)',en:'Average temperature (°C)'},
  subs_extract:{th:'อัตราการสูบน้ำบาดาล (m³/วัน x1000)',en:'Groundwater extraction rate (m³/day x1000)'},
  subs_f_day:{th:'วันที่จำลองผ่านไป',en:'Simulated days elapsed'},
  subs_f_cum:{th:'ดินทรุดสะสมปัจจุบัน',en:'Current cumulative subsidence'},
  subs_f_horizon:{th:'คาดการณ์ดินทรุดใน',en:'Predicted subsidence over'},
  subs_f_risk:{th:'ระดับความเสี่ยง',en:'Risk level'},
  subs_g_moist:{th:'ความชื้นผิวดิน',en:'Topsoil moisture'},
  subs_g_moist_sub:{th:'ในชั้นดินตื้น',en:'in shallow soil layer'},
  subs_g_air:{th:'ความชื้นในอากาศ',en:'Air humidity'},
  subs_g_air_sub:{th:'ความชื้นสัมพัทธ์',en:'relative humidity'},
  subs_g_gw:{th:'ระดับน้ำบาดาล',en:'Groundwater level'},
  subs_g_gw_sub:{th:'จากผิวดิน',en:'below surface'},
  subs_g_rate:{th:'อัตราทรุด',en:'Subsidence rate'},
  subs_g_year:{th:'ปี',en:'yr'},
  subs_rate_chart:{th:'อัตราทรุดตัว',en:'Subsidence rate'},
  subs_cum_chart:{th:'ทรุดสะสม',en:'Cumulative'},
  subs_rank_title:{th:'พื้นที่เสี่ยงดินทรุดสูงสุด (จำลอง)',en:'Highest Subsidence-Risk Areas (simulated)'},
  subs_risk_sev:{th:'วิกฤต',en:'Severe'},
  subs_alert_title:{th:'แจ้งเตือนดินทรุด',en:'Subsidence Alert'},
  subs_alert_body:{th:'อัตราการทรุดตัวของดินอยู่ในระดับวิกฤตจากสภาพอากาศที่จำลอง',en:'Ground subsidence rate has reached a critical level under the simulated weather conditions'},
  subs_event_title:{th:'จำลองเหตุการณ์ดินทรุด',en:'Simulate Subsidence Event'},
  subs_ev_severity:{th:'ความรุนแรง (ซม. ที่คาดว่าจะทรุด)',en:'Severity (expected drop, cm)'},
  subs_ev_severity_short:{th:'ความรุนแรง',en:'Severity'},
  subs_ev_depth:{th:'ความลึกชั้นดินอ่อน (m)',en:'Weak layer depth (m)'},
  subs_ev_dur:{th:'ระยะเวลาการทรุดตัว (วินาที)',en:'Subsidence duration (s)'},
  subs_ev_radius:{th:'พื้นที่ผลกระทบ (km)',en:'Affected radius (km)'},
  subs_event_ready:{th:'พร้อมจำลองเหตุการณ์ดินทรุด',en:'Ready to simulate a subsidence event'},
  subs_event_running:{th:'กำลังจำลองเหตุการณ์ดินทรุด... เหลือเวลา',en:'Simulating subsidence event... time left'},
  subs_event_started_title:{th:'เริ่มจำลองเหตุการณ์ดินทรุด',en:'Subsidence event simulation started'},
  subs_event_stopped_title:{th:'หยุดจำลองเหตุการณ์',en:'Event simulation stopped'},
  subs_event_stopped_body:{th:'การจำลองเหตุการณ์ดินทรุดสิ้นสุดลงแล้ว',en:'The subsidence event simulation has ended'},
  subs_last_event:{th:'เหตุการณ์ล่าสุด',en:'Last event'},
  subs_no_event:{th:'ยังไม่มีเหตุการณ์',en:'No event yet'},
  subs_msg_detected:{th:'ตรวจพบแนวโน้มดินทรุดผิดปกติที่',en:'Abnormal land subsidence detected in'},
  subs_msg_severity:{th:'ความรุนแรงประมาณ',en:'estimated severity'},
  subs_msg_time:{th:'เวลา',en:'at'},
};
let currentLang = localStorage.getItem('eq_lang') || 'th';
function t(key){
  const e=TRANSLATIONS[key];
  if(!e) return key;
  return e[currentLang] || e.th;
}
function applyLanguage(){
  document.documentElement.setAttribute('lang', currentLang==='en'?'en':'th');
  document.getElementById('langToggleLbl').textContent = currentLang==='en' ? 'EN' : 'TH';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    el.textContent=t(key);
  });
  refreshNotifPermHint();
  if(typeof renderTable==='function') renderTable();
  if(typeof renderAlertList==='function') renderAlertList();
  if(typeof updateInfoPanel==='function') updateInfoPanel();
  if(typeof updateAIPrediction==='function') updateAIPrediction();
  if(typeof subsSliderLabels==='function') subsSliderLabels();
  if(typeof updateSubsForecast==='function') updateSubsForecast();
  if(typeof renderSubsRank==='function') renderSubsRank();
  if(typeof updateSubsEventStatus==='function') updateSubsEventStatus();
}
function toggleLanguage(){
  currentLang = currentLang==='th' ? 'en' : 'th';
  localStorage.setItem('eq_lang',currentLang);
  applyLanguage();
  showToast('info', t('lang_changed_title'), t('lang_changed_body'));
}

/* ==================== REAL BROWSER NOTIFICATIONS ==================== */
function refreshNotifPermHint(){
  const hint=document.getElementById('notifPermHint');
  const sw=document.getElementById('switchBrowser');
  if(!('Notification' in window)){
    hint.textContent=t('notif_unsupported');
    sw.classList.remove('on');
    return;
  }
  if(Notification.permission==='granted'){
    hint.textContent=t('notif_perm_granted');
    sw.classList.add('on');
  } else if(Notification.permission==='denied'){
    hint.textContent=t('notif_perm_denied');
    sw.classList.remove('on');
  } else {
    hint.textContent=t('notif_perm_ask');
    sw.classList.remove('on');
  }
}
function toggleBrowserNotif(el){
  if(!('Notification' in window)){
    showToast('info', t('notif_title'), t('notif_unsupported'));
    return;
  }
  if(Notification.permission==='granted'){
    el.classList.toggle('on');
    refreshNotifPermHint();
    if(el.classList.contains('on')) el.classList.add('on'); // stays enabled while granted
    return;
  }
  Notification.requestPermission().then(perm=>{
    refreshNotifPermHint();
    if(perm==='granted'){
      el.classList.add('on');
      sendBrowserNotification(t('notif_title'), t('notif_perm_granted'));
    }
  });
}
function sendBrowserNotification(title,body){
  if(!('Notification' in window)) return false;
  if(Notification.permission!=='granted') return false;
  try{
    const n=new Notification(title,{
      body:body,
      icon:'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2745%27 fill=%27%230e7490%27/%3E%3Cpath d=%27M15 55 L35 55 L42 35 L52 70 L60 50 L68 55 L85 55%27 stroke=%27%2322d3ee%27 stroke-width=%276%27 fill=%27none%27 stroke-linejoin=%27round%27 stroke-linecap=%27round%27/%3E%3C/svg%3E',
      tag:'eq-alert-'+Date.now()
    });
    n.onclick=()=>{ window.focus(); n.close(); };
    setTimeout(()=>n.close(),9000);
    return true;
  }catch(err){
    console.error('Notification error:',err);
    return false;
  }
}
function testBrowserNotification(){
  if(!('Notification' in window)){
    showToast('info', t('notif_title'), t('notif_unsupported'));
    return;
  }
  if(Notification.permission==='default'){
    Notification.requestPermission().then(perm=>{
      refreshNotifPermHint();
      if(perm==='granted'){
        sendBrowserNotification(t('test_notif_title'), t('test_notif_body'));
        showToast('info', t('test_notif_title'), t('test_notif_body'));
      }
    });
    return;
  }
  if(Notification.permission==='granted'){
    sendBrowserNotification(t('test_notif_title'), t('test_notif_body'));
    showToast('info', t('test_notif_title'), t('test_notif_body'));
  } else {
    showToast('info', t('notif_title'), t('notif_perm_denied'));
  }
}

/* ==================== AUTH (client-side, localStorage) ==================== */
async function sha256(str){
  const buf=await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
function getUsers(){
  try{ return JSON.parse(localStorage.getItem('eq_users')||'{}'); }catch(e){ return {}; }
}
function saveUsers(u){ localStorage.setItem('eq_users', JSON.stringify(u)); }
let authMode='login';
function toggleAuthMode(){
  authMode = authMode==='login' ? 'register' : 'login';
  renderAuthUI();
}
function renderAuthUI(){
  const isLogin = authMode==='login';
  document.getElementById('authTitle').textContent = t(isLogin?'auth_login_title':'auth_register_title');
  document.getElementById('authSub').textContent = t(isLogin?'auth_login_sub':'auth_register_sub');
  document.getElementById('authBtn').textContent = t(isLogin?'auth_login_btn':'auth_register_btn');
  document.getElementById('authSwitch').innerHTML =
    `${t(isLogin?'auth_no_account':'auth_has_account')} <span onclick="toggleAuthMode()">${t(isLogin?'auth_switch_register':'auth_switch_login')}</span>`;
  document.getElementById('authErr').textContent='';
}
async function submitAuth(){
  const user=document.getElementById('authUser').value.trim();
  const pass=document.getElementById('authPass').value;
  const errEl=document.getElementById('authErr');
  errEl.textContent='';
  if(!user||!pass){ errEl.textContent=t('auth_err_empty'); return; }
  if(pass.length<4){ errEl.textContent=t('auth_err_short'); return; }
  const users=getUsers();
  const hash=await sha256(pass);
  if(authMode==='register'){
    if(users[user]){ errEl.textContent=t('auth_err_exists'); return; }
    users[user]=hash;
    saveUsers(users);
    showToast('info',t('auth_registered_title'),t('auth_registered_body'));
    loginSession(user);
  } else {
    if(!users[user] || users[user]!==hash){ errEl.textContent=t('auth_err_invalid'); return; }
    loginSession(user);
  }
}
function loginSession(username){
  localStorage.setItem('eq_session', username);
  document.getElementById('authOverlay').classList.add('hidden');
  document.getElementById('adminName').textContent=username;
  showToast('info',t('welcome_back'),username);
}
function logoutUser(){
  localStorage.removeItem('eq_session');
  document.getElementById('authUser').value='';
  document.getElementById('authPass').value='';
  authMode='login';
  renderAuthUI();
  document.getElementById('authOverlay').classList.remove('hidden');
  showToast('info',t('logout_title'),t('logged_out_body2'));
}
function initAuth(){
  renderAuthUI();
  const session=localStorage.getItem('eq_session');
  if(session && getUsers()[session]!==undefined){
    document.getElementById('authOverlay').classList.add('hidden');
    document.getElementById('adminName').textContent=session;
  } else {
    localStorage.removeItem('eq_session');
    document.getElementById('authOverlay').classList.remove('hidden');
  }
}
document.getElementById('authPass').addEventListener('keydown',e=>{ if(e.key==='Enter') submitAuth(); });
document.getElementById('authUser').addEventListener('keydown',e=>{ if(e.key==='Enter') submitAuth(); });

/* ==================== SETTINGS + ALERT HISTORY PERSISTENCE ==================== */
function persistSettings(){
  const s={
    alertEmail:document.getElementById('alertEmail').value,
    ejsPublicKey:document.getElementById('ejsPublicKey').value,
    ejsServiceId:document.getElementById('ejsServiceId').value,
    ejsTemplateId:document.getElementById('ejsTemplateId').value,
    alertLine:document.getElementById('alertLine').value,
    lineToken:document.getElementById('lineToken').value,
    emailOn:document.getElementById('switchEmail').classList.contains('on'),
    lineOn:document.getElementById('switchLine').classList.contains('on'),
    browserOn:document.getElementById('switchBrowser').classList.contains('on'),
  };
  localStorage.setItem('eq_settings', JSON.stringify(s));
}
function loadSettings(){
  let s={};
  try{ s=JSON.parse(localStorage.getItem('eq_settings')||'{}'); }catch(e){}
  if(s.alertEmail) document.getElementById('alertEmail').value=s.alertEmail;
  if(s.ejsPublicKey) document.getElementById('ejsPublicKey').value=s.ejsPublicKey;
  if(s.ejsServiceId) document.getElementById('ejsServiceId').value=s.ejsServiceId;
  if(s.ejsTemplateId) document.getElementById('ejsTemplateId').value=s.ejsTemplateId;
  if(s.alertLine) document.getElementById('alertLine').value=s.alertLine;
  if(s.lineToken) document.getElementById('lineToken').value=s.lineToken;
  if(s.emailOn) document.getElementById('switchEmail').classList.add('on');
  if(s.lineOn) document.getElementById('switchLine').classList.add('on');
  if(s.browserOn && 'Notification' in window && Notification.permission==='granted') document.getElementById('switchBrowser').classList.add('on');
}
function persistAlertHistory(){
  try{
    localStorage.setItem('eq_alert_history', JSON.stringify({
      alertList, bellCount:document.getElementById('bellCount').textContent,
      alertTodayCount:document.getElementById('alertTodayCount').textContent
    }));
  }catch(e){}
}
function loadAlertHistory(){
  try{
    const h=JSON.parse(localStorage.getItem('eq_alert_history')||'null');
    if(h && Array.isArray(h.alertList) && h.alertList.length){
      alertList=h.alertList;
      document.getElementById('bellCount').textContent=h.bellCount||'0';
      document.getElementById('alertTodayCount').textContent=h.alertTodayCount||'0';
    }
  }catch(e){}
}

/* ---------- utility: dropdown / modal ---------- */
function toggleDropdown(id){
  const el=document.getElementById(id);
  const willOpen=!el.classList.contains('open');
  closeAllDropdowns();
  if(willOpen) el.classList.add('open');
}
function closeAllDropdowns(){
  document.querySelectorAll('.dropdown').forEach(d=>d.classList.remove('open'));
}
document.addEventListener('click',e=>{
  if(!e.target.closest('.bell-wrap') && !e.target.closest('.admin-wrap')) closeAllDropdowns();
});
function openModal(title,bodyHtml){
  document.getElementById('modalTitle').textContent=title;
  document.getElementById('modalBody').innerHTML=bodyHtml;
  document.getElementById('modalOverlay').classList.remove('hidden');
}
function closeModal(){document.getElementById('modalOverlay').classList.add('hidden');}

/* ---------- nav ---------- */
function navGo(targetId,el){
  if(targetId==='top'){document.querySelector('.main').scrollTo({top:0,behavior:'smooth'});}
  else{
    const t=document.getElementById(targetId);
    if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
  }
  setActiveNav(el);
}
function setActiveNav(el){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(el) el.classList.add('active');
}

/* ---------- clock ---------- */
function pad(n){return n.toString().padStart(2,'0');}
function updateClock(){
  const d=new Date();
  document.getElementById('clock').textContent=`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  const thMonths=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  document.getElementById('dateTh').textContent=`${d.getDate()} ${thMonths[d.getMonth()]} ${d.getFullYear()+543}`;
  document.getElementById('sysTime').textContent=document.getElementById('clock').textContent;
}
setInterval(updateClock,1000); updateClock();

/* ---------- sensor map (real basemap via Leaflet + OpenStreetMap/Carto) ---------- */
const provinces=[
 {name:'กรุงเทพมหานคร',id:'TH-P01',lat:13.7563,lng:100.5018},
 {name:'กระบี่',id:'TH-P02',lat:8.0863,lng:98.9063},
 {name:'กาญจนบุรี',id:'TH-P03',lat:14.0227,lng:99.5328},
 {name:'กาฬสินธุ์',id:'TH-P04',lat:16.4322,lng:103.5060},
 {name:'กำแพงเพชร',id:'TH-P05',lat:16.4827,lng:99.5226},
 {name:'ขอนแก่น',id:'TH-P06',lat:16.4419,lng:102.8360},
 {name:'จันทบุรี',id:'TH-P07',lat:12.6113,lng:102.1035},
 {name:'ฉะเชิงเทรา',id:'TH-P08',lat:13.6904,lng:101.0779},
 {name:'ชลบุรี',id:'TH-P09',lat:13.3611,lng:100.9847},
 {name:'ชัยนาท',id:'TH-P10',lat:15.1852,lng:100.1251},
 {name:'ชัยภูมิ',id:'TH-P11',lat:15.8068,lng:102.0313},
 {name:'ชุมพร',id:'TH-P12',lat:10.4930,lng:99.1800},
 {name:'เชียงราย',id:'TH-P13',lat:19.9105,lng:99.8406},
 {name:'เชียงใหม่',id:'TH-P14',lat:18.7883,lng:98.9853},
 {name:'ตรัง',id:'TH-P15',lat:7.5645,lng:99.6240},
 {name:'ตราด',id:'TH-P16',lat:12.2428,lng:102.5178},
 {name:'ตาก',id:'TH-P17',lat:16.8697,lng:99.1257},
 {name:'นครนายก',id:'TH-P18',lat:14.2069,lng:101.2130},
 {name:'นครปฐม',id:'TH-P19',lat:13.8199,lng:100.0621},
 {name:'นครพนม',id:'TH-P20',lat:17.4033,lng:104.7794},
 {name:'นครราชสีมา',id:'TH-P21',lat:14.9799,lng:102.0977},
 {name:'นครศรีธรรมราช',id:'TH-P22',lat:8.4304,lng:99.9631},
 {name:'นครสวรรค์',id:'TH-P23',lat:15.7030,lng:100.1367},
 {name:'นนทบุรี',id:'TH-P24',lat:13.8590,lng:100.5220},
 {name:'นราธิวาส',id:'TH-P25',lat:6.4264,lng:101.8231},
 {name:'น่าน',id:'TH-P26',lat:18.7756,lng:100.7730},
 {name:'บึงกาฬ',id:'TH-P27',lat:18.3609,lng:103.6465},
 {name:'บุรีรัมย์',id:'TH-P28',lat:14.9930,lng:103.1029},
 {name:'ปทุมธานี',id:'TH-P29',lat:14.0208,lng:100.5250},
 {name:'ประจวบคีรีขันธ์',id:'TH-P30',lat:11.8127,lng:99.7957},
 {name:'ปราจีนบุรี',id:'TH-P31',lat:14.0511,lng:101.3730},
 {name:'ปัตตานี',id:'TH-P32',lat:6.8697,lng:101.2500},
 {name:'พระนครศรีอยุธยา',id:'TH-P33',lat:14.3532,lng:100.5680},
 {name:'พะเยา',id:'TH-P34',lat:19.1664,lng:99.9019},
 {name:'พังงา',id:'TH-P35',lat:8.4515,lng:98.5310},
 {name:'พัทลุง',id:'TH-P36',lat:7.6167,lng:100.0740},
 {name:'พิจิตร',id:'TH-P37',lat:16.4429,lng:100.3487},
 {name:'พิษณุโลก',id:'TH-P38',lat:16.8211,lng:100.2659},
 {name:'เพชรบุรี',id:'TH-P39',lat:13.1119,lng:99.9440},
 {name:'เพชรบูรณ์',id:'TH-P40',lat:16.4200,lng:101.1590},
 {name:'แพร่',id:'TH-P41',lat:18.1445,lng:100.1405},
 {name:'ภูเก็ต',id:'TH-P42',lat:7.8804,lng:98.3923},
 {name:'มหาสารคาม',id:'TH-P43',lat:16.1849,lng:103.3005},
 {name:'มุกดาหาร',id:'TH-P44',lat:16.5450,lng:104.7230},
 {name:'แม่ฮ่องสอน',id:'TH-P45',lat:19.3020,lng:97.9654},
 {name:'ยโสธร',id:'TH-P46',lat:15.7920,lng:104.1450},
 {name:'ยะลา',id:'TH-P47',lat:6.5410,lng:101.2800},
 {name:'ร้อยเอ็ด',id:'TH-P48',lat:16.0538,lng:103.6520},
 {name:'ระนอง',id:'TH-P49',lat:9.9528,lng:98.6084},
 {name:'ระยอง',id:'TH-P50',lat:12.6833,lng:101.2372},
 {name:'ราชบุรี',id:'TH-P51',lat:13.5369,lng:99.8172},
 {name:'ลพบุรี',id:'TH-P52',lat:14.7995,lng:100.6534},
 {name:'ลำปาง',id:'TH-P53',lat:18.2888,lng:99.4907},
 {name:'ลำพูน',id:'TH-P54',lat:18.5744,lng:99.0087},
 {name:'เลย',id:'TH-P55',lat:17.4860,lng:101.7220},
 {name:'ศรีสะเกษ',id:'TH-P56',lat:15.1186,lng:104.3220},
 {name:'สกลนคร',id:'TH-P57',lat:17.1545,lng:104.1348},
 {name:'สงขลา',id:'TH-P58',lat:7.1897,lng:100.5951},
 {name:'สตูล',id:'TH-P59',lat:6.6238,lng:100.0674},
 {name:'สมุทรปราการ',id:'TH-P60',lat:13.5991,lng:100.5998},
 {name:'สมุทรสงคราม',id:'TH-P61',lat:13.4098,lng:100.0022},
 {name:'สมุทรสาคร',id:'TH-P62',lat:13.5475,lng:100.2740},
 {name:'สระแก้ว',id:'TH-P63',lat:13.8244,lng:102.0645},
 {name:'สระบุรี',id:'TH-P64',lat:14.5289,lng:100.9107},
 {name:'สิงห์บุรี',id:'TH-P65',lat:14.8907,lng:100.4034},
 {name:'สุโขทัย',id:'TH-P66',lat:17.0068,lng:99.8265},
 {name:'สุพรรณบุรี',id:'TH-P67',lat:14.4744,lng:100.1177},
 {name:'สุราษฎร์ธานี',id:'TH-P68',lat:9.1382,lng:99.3215},
 {name:'สุรินทร์',id:'TH-P69',lat:14.8818,lng:103.4936},
 {name:'หนองคาย',id:'TH-P70',lat:17.8783,lng:102.7420},
 {name:'หนองบัวลำภู',id:'TH-P71',lat:17.2038,lng:102.4260},
 {name:'อ่างทอง',id:'TH-P72',lat:14.5896,lng:100.4549},
 {name:'อำนาจเจริญ',id:'TH-P73',lat:15.8656,lng:104.6255},
 {name:'อุดรธานี',id:'TH-P74',lat:17.4139,lng:102.7872},
 {name:'อุตรดิตถ์',id:'TH-P75',lat:17.6200,lng:100.0993},
 {name:'อุทัยธานี',id:'TH-P76',lat:15.3835,lng:100.0246},
 {name:'อุบลราชธานี',id:'TH-P77',lat:15.2287,lng:104.8564},
];
const sensorTypes=['Accelerometer','Geophone','GPS','Soil'];
const liveRanges={
  ok:{vib:[0.3,1.6],disp:[0,0.6],moist:[20,45],press:[100.4,101.6],risk:[5,25]},
  warn:{vib:[1.6,3.2],disp:[0.6,2.2],moist:[24,42],press:[100.2,101.8],risk:[25,45]},
  high:{vib:[3.2,6],disp:[2.2,5],moist:[22,42],press:[99.8,102.2],risk:[45,70]},
  danger:{vib:[6,10],disp:[5,10],moist:[20,48],press:[99.2,102.8],risk:[70,95]},
  offline:{vib:[0,0],disp:[0,0],moist:[0,0],press:[0,0],risk:[0,0]},
};
function randIn(range){ return range[0]+Math.random()*(range[1]-range[0]); }
function initLiveValues(status){
  const r=liveRanges[status];
  return { vib:randIn(r.vib), disp:randIn(r.disp), moist:randIn(r.moist), press:status==='offline'?0:100+randIn([0,2]), risk:randIn(r.risk) };
}
function stepLiveValues(sensorObj){
  if(sensorObj.status==='offline'){ sensorObj.vib=0;sensorObj.disp=0;sensorObj.moist=0;sensorObj.press=0;sensorObj.risk=0; return; }
  const r=liveRanges[sensorObj.status];
  const drift=(cur,range,amt)=>{
    let v=cur+(Math.random()-0.5)*amt;
    return Math.min(range[1]+amt, Math.max(range[0]-amt, v));
  };
  sensorObj.vib=Math.max(0,drift(sensorObj.vib,r.vib,0.25));
  sensorObj.disp=Math.max(0,drift(sensorObj.disp,r.disp,0.2));
  sensorObj.moist=Math.min(100,Math.max(0,drift(sensorObj.moist,r.moist,1)));
  sensorObj.press=drift(sensorObj.press-100,[r.press[0]-100,r.press[1]-100],0.15)+100;
  sensorObj.risk=Math.min(100,Math.max(0,drift(sensorObj.risk,r.risk,2)));
}
let sensors=[];
function seedSensors(){
  sensors=[];
  const statuses=['ok','ok','ok','ok','warn','high','offline'];
  provinces.forEach((p,pIdx)=>{
    const rnd=Math.random();
    const count = rnd<0.45 ? 1 : (rnd<0.8 ? 2 : 3); /* ~1-3 sensors/province, avg ~1.6 => ~120-150 total */
    for(let k=0;k<count;k++){
      const status = statuses[Math.floor(Math.random()*statuses.length)];
      sensors.push(Object.assign({
        lat:p.lat+(Math.random()-0.5)*0.6,
        lng:p.lng+(Math.random()-0.5)*0.6,
        status,
        type: sensorTypes[(pIdx+k)%sensorTypes.length],
        name:p.name, id: k===0 ? p.id : p.id+'-'+(k+1)
      }, initLiveValues(status)));
    }
  });
}
seedSensors();
const statusColor={ok:'#22c55e',warn:'#eab308',high:'#f97316',danger:'#ef4444',offline:'#6b7280'};
const statusLabel=new Proxy({},{get:(target,prop)=>t('s_'+prop)});

let mapFilterStatus='all', mapFilterType='all';
let selectedSensorIndex=0;

const THAI_CENTER=[13.55,101.2];
const map=L.map('mapCanvas',{zoomControl:false,attributionControl:true,minZoom:5,maxZoom:14}).setView(THAI_CENTER,6);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{
  attribution:'&copy; OpenStreetMap contributors &copy; CARTO',
  subdomains:'abcd',maxZoom:19
}).addTo(map);
L.control.scale({metric:true,imperial:false,position:'bottomright'}).addTo(map);

provinces.forEach(p=>{
  L.marker([p.lat,p.lng],{
    icon:L.divIcon({className:'',html:`<div class="province-label">${p.name}</div>`,iconAnchor:[-6,10]}),
    interactive:false
  }).addTo(map);
});

function pinIcon(status,selected,pulse){
  const c=statusColor[status];
  const size=selected?28:22;
  return L.divIcon({
    className:'',
    html:`<div class="sensor-pin${selected?' selected':''}" style="background:${c}">${pulse?'<span class="pin-ring"></span>':''}</div>`,
    iconSize:[size,size],
    iconAnchor:[size/2,size]
  });
}

sensors.forEach((s,idx)=>{
  s.marker=L.marker([s.lat,s.lng],{icon:pinIcon(s.status,idx===selectedSensorIndex,s.status==='danger')})
    .addTo(map)
    .on('click',()=>selectSensor(idx));
});

function refreshMarkerIcons(){
  sensors.forEach((s,idx)=>{
    s.marker.setIcon(pinIcon(s.status,idx===selectedSensorIndex,s.status==='danger'));
    const matchStatus = mapFilterStatus==='all' || s.status===mapFilterStatus;
    const matchType = mapFilterType==='all' || s.type===mapFilterType;
    const visible = matchStatus && matchType;
    const el=s.marker.getElement();
    if(el) el.style.opacity = visible ? '1' : '.18';
  });
}
function selectSensor(idx){
  selectedSensorIndex=idx;
  refreshMarkerIcons();
  updateInfoPanel();
  showToast('info',t('select_sensor'),`${sensors[idx].id} • ${sensors[idx].name}`);
}
function applyMapFilters(){
  mapFilterStatus=document.getElementById('filterStatus').value;
  mapFilterType=document.getElementById('filterType').value;
  document.querySelectorAll('.leg-item').forEach(l=>l.classList.toggle('active', l.dataset.s===mapFilterStatus));
  refreshMarkerIcons();
}
function legendClick(status){
  const sel=document.getElementById('filterStatus');
  sel.value = (sel.value===status) ? 'all' : status;
  applyMapFilters();
}
function zoom(dir){ dir>0 ? map.zoomIn() : map.zoomOut(); }
function resetZoom(){ map.setView(THAI_CENTER,6); }
window.addEventListener('resize',()=>map.invalidateSize());
setTimeout(()=>map.invalidateSize(),80);
refreshMarkerIcons();

/* ---------- sparkline charts ---------- */
const chartIds=['vib','disp','press','moist','risk','trend'];
const chartData={};
chartIds.forEach(id=>{chartData[id]=Array.from({length:40},()=>baseFor(id));});
function baseFor(id){return {vib:2,disp:0,press:101,moist:24,risk:18,trend:32}[id];}
const chartColor={vib:'#3b82f6',disp:'#22c55e',press:'#eab308',moist:'#a855f7',risk:'#06b6d4',trend:'#f97316'};

function drawSpark(id){
  const c=document.getElementById('c-'+id);
  const cx=c.getContext('2d');
  c.width=c.clientWidth*devicePixelRatio;
  c.height=c.clientHeight*devicePixelRatio;
  const data=chartData[id];
  const min=Math.min(...data), max=Math.max(...data);
  const range=(max-min)||1;
  cx.clearRect(0,0,c.width,c.height);
  cx.beginPath();
  data.forEach((v,i)=>{
    const x=(i/(data.length-1))*c.width;
    const y=c.height - ((v-min)/range)*c.height*0.85 - c.height*0.075;
    i===0?cx.moveTo(x,y):cx.lineTo(x,y);
  });
  cx.strokeStyle=chartColor[id];
  cx.lineWidth=2*devicePixelRatio;
  cx.stroke();
  cx.lineTo(c.width,c.height);cx.lineTo(0,c.height);cx.closePath();
  const grad=cx.createLinearGradient(0,0,0,c.height);
  grad.addColorStop(0,chartColor[id]+'55');
  grad.addColorStop(1,chartColor[id]+'00');
  cx.fillStyle=grad;
  cx.fill();
}

let simActive=false, simIntensity=0, simSensorIndex=null;
function stepSimBoost(s){
  const boost=simIntensity;
  s.vib=Math.min(12,s.vib+boost*1.0+Math.random()*0.4);
  s.disp=Math.min(12,s.disp+boost*0.8+Math.random()*0.3);
  s.moist=Math.min(100,s.moist+boost*1.5+(Math.random()-0.3));
  s.press=s.press+boost*0.3+(Math.random()-0.5)*0.2;
  s.risk=Math.min(99,s.risk+boost*9+Math.random()*3);
  if(s.risk>75) s.status='danger';
  else if(s.risk>55) s.status='high';
  else if(s.risk>35) s.status='warn';
}
function tick(){
  /* live per-province sensor simulation: every sensor drifts independently within its status band */
  sensors.forEach((s,idx)=>{
    if(simActive && idx===simSensorIndex) stepSimBoost(s);
    else stepLiveValues(s);
  });
  fullSensorData.forEach(r=>stepLiveTableRow(r));

  /* mirror the currently-selected sensor's live readings into the chart panel */
  const sel=sensors[selectedSensorIndex];
  chartData.vib.push(sel.vib);
  chartData.disp.push(sel.disp);
  chartData.press.push(sel.press);
  chartData.moist.push(sel.moist);
  chartData.risk.push(sel.risk);
  chartData.trend.push(Math.max(0,Math.min(100, sel.risk*0.8 + (Math.random()-0.5)*4 + 10)));
  chartIds.forEach(id=>{ if(chartData[id].length>40) chartData[id].shift(); drawSpark(id); });

  document.getElementById('v-vib').textContent=chartData.vib.at(-1).toFixed(1);
  document.getElementById('v-disp').textContent='+'+chartData.disp.at(-1).toFixed(1);
  document.getElementById('v-press').textContent=chartData.press.at(-1).toFixed(1);
  document.getElementById('v-moist').textContent=Math.round(chartData.moist.at(-1));
  document.getElementById('v-risk').textContent=Math.round(chartData.risk.at(-1));
  document.getElementById('v-trend').textContent=Math.round(chartData.trend.at(-1));

  updateInfoPanel();
  updateAIPrediction();
  refreshMarkerIcons();

  if(simActive){
    const target=sensors[simSensorIndex];
    if(target.risk>75 && !alertFiredThisSim){
      fireAbnormalAlert();
      alertFiredThisSim=true;
    }
  }
}
setInterval(tick,1000);

function updateInfoPanel(){
  const s=sensors[selectedSensorIndex];
  document.getElementById('infoName').textContent=s.id;
  document.getElementById('infoLoc').textContent=s.name+', '+t('detail_thai');
  document.getElementById('chartSensorId').textContent=s.id;
  const risk=s.risk;
  document.getElementById('infoTime').textContent=document.getElementById('clock').textContent;
  document.getElementById('infoVib').textContent=s.vib.toFixed(1)+' mm/s';
  document.getElementById('infoDisp').textContent='+'+s.disp.toFixed(1)+' mm';
  document.getElementById('infoMoist').textContent=Math.round(s.moist)+' %';
  document.getElementById('infoPress').textContent=s.press.toFixed(1)+' kPa';
  const badge=document.getElementById('infoBadge');
  const riskLbl=document.getElementById('infoRisk');
  const cls = s.status==='offline'?'offline':s.status;
  const txt = statusLabel[s.status];
  const riskTxt = s.status==='offline'?t('risk_na'):(risk>75?t('risk_vhigh'):risk>55?t('risk_high2'):risk>35?t('risk_med'):t('risk_low'));
  badge.className='badge '+cls; badge.textContent=txt; riskLbl.textContent=riskTxt;
}

function updateAIPrediction(){
  const risk=Math.round(chartData.risk.at(-1));
  document.getElementById('riskPct').textContent=risk+'%';
  const bar=document.getElementById('riskBar');
  bar.innerHTML='';
  const segs=10, on=Math.round(risk/10);
  for(let i=0;i<segs;i++){
    const s=document.createElement('i');
    if(i<on) s.classList.add('on');
    bar.appendChild(s);
  }
  document.getElementById('predMag').textContent=(3.5+risk/100*3).toFixed(1)+' Mw';
  document.getElementById('predConf').textContent=Math.min(97,60+Math.round(risk/2))+'%';
  document.getElementById('predTime').textContent= risk>75 ? Math.max(3,30-Math.round(risk/4))+' '+t('minutes') : '-';
  document.getElementById('predUpdated').textContent=t('last_updated')+' '+document.getElementById('clock').textContent;
}

/* ---------- sensor table (with mock full dataset + filters) ---------- */
const fullSensorData=[
 {id:'TH-CM-024',loc:'เชียงใหม่',status:'high',vib:7.2,disp:7.2,moist:28},
 {id:'TH-LP-011',loc:'ลำปาง',status:'high',vib:4.8,disp:4.1,moist:31},
 {id:'TH-UT-007',loc:'อุดรธานี',status:'warn',vib:2.6,disp:2.3,moist:35},
 {id:'TH-SP-002',loc:'สุพรรณบุรี',status:'ok',vib:0.8,disp:0.4,moist:45},
 {id:'TH-NS-009',loc:'นครสวรรค์',status:'ok',vib:1.1,disp:0.6,moist:42},
 {id:'TH-KK-014',loc:'ขอนแก่น',status:'ok',vib:0.6,disp:0.2,moist:38},
 {id:'TH-PK-031',loc:'ภูเก็ต',status:'offline',vib:0,disp:0,moist:0},
 {id:'TH-CB-018',loc:'ชลบุรี',status:'warn',vib:2.1,disp:1.8,moist:33},
 {id:'TH-RY-005',loc:'ระยอง',status:'ok',vib:0.5,disp:0.1,moist:40},
 {id:'TH-SK-022',loc:'สงขลา',status:'offline',vib:0,disp:0,moist:0},
 {id:'TH-NR-003',loc:'นราธิวาส',status:'ok',vib:0.9,disp:0.3,moist:44},
 {id:'TH-PB-019',loc:'เพชรบูรณ์',status:'high',vib:3.9,disp:3.2,moist:30},
];
function stepLiveTableRow(row){
  if(row.status==='offline'){ row.vib=0; row.disp=0; row.moist=0; return; }
  const r=liveRanges[row.status];
  const drift=(cur,range,amt)=>Math.min(range[1]+amt, Math.max(range[0]-amt, cur+(Math.random()-0.5)*amt));
  row.vib=Math.max(0,drift(row.vib,r.vib,0.2));
  row.disp=Math.max(0,drift(row.disp,r.disp,0.15));
  row.moist=Math.min(100,Math.max(0,drift(row.moist,r.moist,0.8)));
}
const statusClsMap={ok:'risk-low',warn:'risk-med',high:'risk-high',offline:'risk-off'};
const statusTxtMap=new Proxy({},{get:(target,prop)=>t('s_'+prop)});
const statusRiskMap=new Proxy({},{get:(target,prop)=>({ok:t('risk_low'),warn:t('risk_low'),high:t('risk_med'),offline:t('risk_na')}[prop])});
let currentTableFilter='all';

function renderTable(){
  const tb=document.getElementById('sensorTable');
  tb.innerHTML='';
  let rows=fullSensorData;
  if(currentTableFilter==='online') rows=rows.filter(r=>r.status!=='offline');
  else if(currentTableFilter==='offline') rows=rows.filter(r=>r.status==='offline');
  else if(currentTableFilter==='abnormal') rows=rows.filter(r=>r.status==='warn'||r.status==='high');
  rows.slice(0,8).forEach(r=>{
    const tr=document.createElement('tr');
    const cls=statusClsMap[r.status];
    tr.innerHTML=`<td>${r.id}</td><td>${r.loc}</td><td class="${cls}">${statusTxtMap[r.status]}</td>
      <td>${document.getElementById('clock').textContent}</td><td>${r.vib.toFixed(1)}</td><td>${r.disp>0?'+':''}${r.disp.toFixed(1)}</td><td>${Math.round(r.moist)}</td>
      <td class="${cls}">${statusRiskMap[r.status]}</td>`;
    tr.onclick=()=>openSensorRowModal(r);
    tb.appendChild(tr);
  });
}
renderTable();
setInterval(renderTable,4000);

function statClick(filter,el){
  document.querySelectorAll('.stat').forEach(s=>s.classList.remove('selected'));
  if(filter==='all'){ clearTableFilter(); return; }
  el.classList.add('selected');
  currentTableFilter=filter;
  const labels={online:t('stat_online'),offline:t('stat_offline'),abnormal:t('stat_abnormal'),alerttoday:t('stat_alerttoday')};
  if(filter==='alerttoday'){ openAllAlertsModal(); return; }
  document.getElementById('tableFilterNote').style.display='flex';
  document.getElementById('tableFilterLabel').textContent=labels[filter];
  renderTable();
  navGo('navSensorData');
}
function clearTableFilter(){
  currentTableFilter='all';
  document.querySelectorAll('.stat').forEach(s=>s.classList.remove('selected'));
  document.getElementById('tableFilterNote').style.display='none';
  renderTable();
}
function openSensorRowModal(r){
  openModal(`${t('sensor_detail_title')} ${r.id}`,`
    <div class="mrow"><span>${t('detail_location')}</span><b>${r.loc}</b></div>
    <div class="mrow"><span>${t('status')}</span><b>${statusTxtMap[r.status]}</b></div>
    <div class="mrow"><span>${t('vibration')}</span><b>${r.vib.toFixed(1)} mm/s</b></div>
    <div class="mrow"><span>${t('displacement')}</span><b>${r.disp>0?'+':''}${r.disp.toFixed(1)} mm</b></div>
    <div class="mrow"><span>${t('soil_moisture')}</span><b>${Math.round(r.moist)}%</b></div>
    <div class="mrow"><span>${t('risk')}</span><b>${statusRiskMap[r.status]}</b></div>
    <div class="mrow"><span>${t('last_time')}</span><b>${document.getElementById('clock').textContent}</b></div>
  `);
}
function openAllSensorsModal(){
  let rowsHtml=fullSensorData.map(r=>`<div class="mrow"><span>${r.id} • ${r.loc}</span><b class="${statusClsMap[r.status]}">${statusTxtMap[r.status]}</b></div>`).join('');
  const title = currentLang==='en' ? 'All Sensors (sample)' : 'เซนเซอร์ทั้งหมด (ตัวอย่าง)';
  const note = currentLang==='en' ? `Showing sample of ${fullSensorData.length} out of 128 sensors` : `แสดงตัวอย่าง ${fullSensorData.length} จากทั้งหมด 128 ตัว`;
  openModal(title,rowsHtml+`<div style="margin-top:10px;color:var(--sub)">${note}</div>`);
}

/* ---------- alerts list ---------- */
let alertList=[
 {sensor:'TH-LP-011',loc:'ลำปาง',type:'high',time:''},
 {sensor:'TH-UT-007',loc:'อุดรธานี',type:'warn',time:''},
 {sensor:'TH-SP-002',loc:'สุพรรณบุรี',type:'ok',time:''},
 {sensor:'TH-NS-009',loc:'นครสวรรค์',type:'ok',time:''},
];
const dotColorMap={high:'var(--orange)',warn:'var(--yellow)',ok:'var(--green)',danger:'var(--red)'};
function renderAlertList(){
  const wrap=document.getElementById('alertList');
  wrap.innerHTML='';
  const ddWrap=document.getElementById('bellDDList');
  ddWrap.innerHTML='';
  alertList.forEach((a,i)=>{
    const label=t('s_'+a.type);
    const tm=a.time||document.getElementById('clock').textContent;
    const div=document.createElement('div');
    div.className='alert-item '+a.type;
    div.innerHTML=`<span class="dot" style="background:${dotColorMap[a.type]}"></span>
      <div class="txt"><b>${label}</b><small>${a.sensor} • ${a.loc}</small></div>
      <div class="time">${tm}</div>`;
    div.onclick=()=>openModal(t('alert_detail_title2'),`
      <div class="mrow"><span>Sensor</span><b>${a.sensor}</b></div>
      <div class="mrow"><span>${t('detail_area')}</span><b>${a.loc}</b></div>
      <div class="mrow"><span>${t('status')}</span><b>${label}</b></div>
      <div class="mrow"><span>${t('last_time')}</span><b>${tm}</b></div>
    `);
    wrap.appendChild(div);
    if(i<5){
      const dd=document.createElement('div');
      dd.className='dd-item';
      dd.innerHTML=`${label} — ${a.sensor}<small>${a.loc} • ${tm}</small>`;
      ddWrap.appendChild(dd);
    }
  });
}
renderAlertList();
setInterval(renderAlertList,5000);
function openAllAlertsModal(){
  closeAllDropdowns();
  let html=alertList.map(a=>`<div class="mrow"><span>${a.sensor} • ${a.loc}</span><b>${t('s_'+a.type)} • ${a.time||document.getElementById('clock').textContent}</b></div>`).join('');
  const title = currentLang==='en' ? 'All Alerts' : 'การแจ้งเตือนทั้งหมด';
  const empty = currentLang==='en' ? '<div>No alerts</div>' : '<div>ไม่มีการแจ้งเตือน</div>';
  openModal(title,html||empty);
}

/* ---------- simulation ---------- */
let simTimer=null, simTimeLeft=0, alertFiredThisSim=false;
const magRange=document.getElementById('magRange'), depthRange=document.getElementById('depthRange'),
      durRange=document.getElementById('durRange'), radRange=document.getElementById('radRange');
[magRange,depthRange,durRange,radRange].forEach(r=>r.addEventListener('input',syncSimLabels));
function syncSimLabels(){
  document.getElementById('magVal').textContent=parseFloat(magRange.value).toFixed(1);
  document.getElementById('depthVal').textContent=depthRange.value;
  document.getElementById('durVal').textContent=durRange.value;
  document.getElementById('radVal').textContent=radRange.value;
}
syncSimLabels();

function startSimulation(){
  if(simActive) return;
  simActive=true;
  alertFiredThisSim=false;
  simSensorIndex=selectedSensorIndex;
  simTimeLeft=parseInt(durRange.value);
  const mag=parseFloat(magRange.value);
  simIntensity = Math.min(1, mag/9);
  document.getElementById('btnStart').disabled=true;
  document.getElementById('btnStop').disabled=false;
  sensors[simSensorIndex].status='high';
  refreshMarkerIcons();
  const target=sensors[simSensorIndex];
  const startMsg = currentLang==='en'
    ? `${target.name} (${target.id}) • Magnitude ${mag.toFixed(1)} Mw • Depth ${depthRange.value} km • Duration ${durRange.value} s`
    : `${target.name} (${target.id}) • Magnitude ${mag.toFixed(1)} Mw • ความลึก ${depthRange.value} km • ระยะเวลา ${durRange.value} วิ`;
  showToast('info', currentLang==='en'?'Simulation started':'เริ่มการจำลอง', startMsg);
  updateSimStatus();
  simTimer=setInterval(()=>{
    simTimeLeft--;
    updateSimStatus();
    if(simTimeLeft<=0){ stopSimulation(); }
  },1000);
}
function updateSimStatus(){
  document.getElementById('simStatus').textContent= simActive
    ? (currentLang==='en' ? `Simulating event... ${simTimeLeft}s remaining` : `กำลังจำลองเหตุการณ์... เหลือเวลา ${simTimeLeft} วินาที`)
    : t('sim_ready');
}
function stopSimulation(){
  const wasActive=simActive;
  simActive=false;
  simIntensity=0;
  clearInterval(simTimer);
  document.getElementById('btnStart').disabled=false;
  document.getElementById('btnStop').disabled=true;
  updateSimStatus();
  if(wasActive) showToast('info', currentLang==='en'?'Simulation stopped':'หยุดการจำลอง', currentLang==='en'?'The simulation has ended':'การจำลองเหตุการณ์สิ้นสุดลงแล้ว');
}
function resetSimulation(){
  stopSimulation();
  if(simSensorIndex!==null){
    Object.assign(sensors[simSensorIndex], initLiveValues('ok'));
    sensors[simSensorIndex].status='ok';
  }
  simSensorIndex=null;
  chartIds.forEach(id=>{chartData[id]=Array.from({length:40},()=>baseFor(id));});
  refreshMarkerIcons();
  document.getElementById('topAlert').classList.add('hidden');
  document.getElementById('bigAlert').style.display='none';
  magRange.value=6.5; depthRange.value=15; durRange.value=30; radRange.value=100;
  syncSimLabels();
  showToast('info',t('reset_done_title'),t('reset_done_body'));
}

/* ---------- abnormal alert + notification dispatch ---------- */
let lastAlertDetail=null;
function fireAbnormalAlert(){
  const mag=parseFloat(magRange.value);
  const target=sensors[simSensorIndex!==null?simSensorIndex:selectedSensorIndex];
  const area=target.name;
  const timeStr=document.getElementById('clock').textContent;
  const etaMin=Math.max(3,30-Math.round(mag*3));

  document.getElementById('topAlert').classList.remove('hidden');
  document.getElementById('topAlertText').textContent=`${t('eq_alert_prefix')} ${area}`;

  const big=document.getElementById('bigAlert');
  big.style.display='block';
  document.getElementById('bigSensor').textContent=target.id;
  document.getElementById('bigAlertTime').textContent=timeStr;
  document.getElementById('bigArea').textContent=area;
  document.getElementById('bigPred').textContent=`${t('eq_within')} ${mag.toFixed(1)} Mw ${t('eq_within2')} ${etaMin} ${t('minutes')}`;

  lastAlertDetail={mag,area,timeStr,etaMin,depth:depthRange.value,dur:durRange.value,radius:radRange.value};

  const cur=parseInt(document.getElementById('bellCount').textContent||'0');
  document.getElementById('bellCount').textContent=cur+1;
  const today=parseInt(document.getElementById('alertTodayCount').textContent||'0');
  document.getElementById('alertTodayCount').textContent=today+1;

  alertList.unshift({sensor:target.id,loc:area,type:'danger',time:timeStr});
  renderAlertList();
  persistAlertHistory();

  sendNotifications(area,mag,timeStr);
}
function openAlertDetailModal(){
  if(!lastAlertDetail){ openModal(t('alert_detail_title2'),`<div>${t('no_abnormal')}</div>`); return; }
  const d=lastAlertDetail;
  openModal(t('alert_detail_title'),`
    <div class="mrow"><span>${t('detail_area')}</span><b>${d.area}</b></div>
    <div class="mrow"><span>${t('detail_alert_time')}</span><b>${d.timeStr}</b></div>
    <div class="mrow"><span>${t('detail_mag')}</span><b>${d.mag.toFixed(1)} Mw</b></div>
    <div class="mrow"><span>${t('detail_depth')}</span><b>${d.depth} km</b></div>
    <div class="mrow"><span>${t('detail_dur')}</span><b>${d.dur} ${t('seconds')}</b></div>
    <div class="mrow"><span>${t('detail_radius')}</span><b>${d.radius} km</b></div>
    <div class="mrow"><span>${t('detail_eta')}</span><b>${d.etaMin} ${t('minutes')}</b></div>
    <div style="margin-top:10px">${t('detail_advice')}</div>
  `);
}

function sendNotifications(area,mag,timeStr){
  const emailOn=document.getElementById('switchEmail').classList.contains('on');
  const lineOn=document.getElementById('switchLine').classList.contains('on');
  const browserOn=document.getElementById('switchBrowser').classList.contains('on') && ('Notification' in window) && Notification.permission==='granted';
  const email=document.getElementById('alertEmail').value || t('no_email_set');
  const msg=`${t('detected_abnormal')} ${area} ${t('predicted_size')} ${mag.toFixed(1)} Mw ${t('at_time')} ${timeStr}`;

  if(emailOn) sendRealEmail(area,mag,timeStr,email,msg);
  if(lineOn) sendRealLine(msg);
  if(browserOn) sendBrowserNotification(`${t('eq_alert_title')} — ${area}`, msg);
  if(!emailOn && !lineOn && !browserOn) showToast('info',t('notif_no_channel_title'),t('notif_no_channel_body'));
}

function sendRealEmail(area,mag,timeStr,email,msg){
  const pub=document.getElementById('ejsPublicKey').value.trim();
  const svc=document.getElementById('ejsServiceId').value.trim();
  const tpl=document.getElementById('ejsTemplateId').value.trim();
  if(!pub||!svc||!tpl||!window.emailjs){
    showToast('info',t('email_sent_title'),t('ejs_not_configured'));
    return;
  }
  try{
    emailjs.init({publicKey:pub});
    emailjs.send(svc,tpl,{ to_email:email, area:area, magnitude:mag.toFixed(1)+' Mw', time:timeStr, message:msg })
      .then(()=>showToast('email',t('email_sent_title'),`${t('to_label')}: ${email}\n${msg}`))
      .catch(err=>{ console.error('EmailJS error:',err); showToast('email',t('email_sent_title'),t('email_send_failed')); });
  }catch(err){
    console.error('EmailJS error:',err);
    showToast('email',t('email_sent_title'),t('email_send_failed'));
  }
}

async function sendRealLine(msg){
  const token=document.getElementById('lineToken').value.trim();
  const userId=document.getElementById('alertLine').value.trim();
  if(!token||!userId){
    showToast('info',t('line_sent_title'),t('line_not_configured'));
    return;
  }
  try{
    const res=await fetch('https://api.line.me/v2/bot/message/push',{
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer '+token },
      body:JSON.stringify({ to:userId, messages:[{type:'text',text:msg}] })
    });
    if(res.ok){ showToast('line',t('line_sent_title'),`${t('to_label')}: ${userId}\n${msg}`); }
    else { showToast('line',t('line_sent_title'),t('line_send_failed')); }
  }catch(err){
    console.error('LINE push error:',err);
    showToast('line',t('line_sent_title'),t('line_send_failed'));
  }
}

function showToast(type,title,body){
  const wrap=document.getElementById('toastWrap');
  const el=document.createElement('div');
  el.className='toast '+type;
  const icon = type==='email'
    ? '<svg class="ico ico-md" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>'
    : type==='line'
    ? '<svg class="ico ico-md" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>'
    : '<svg class="ico ico-md" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
  el.innerHTML=`<div class="t-hd"><span>${icon} ${title}</span><span style="cursor:pointer" onclick="this.closest('.toast').remove()"><svg class="ico ico-sm" viewBox="0 0 24 24" stroke-width="2.4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></div><div class="t-body">${body.replace(/\n/g,'<br>')}</div>`;
  wrap.appendChild(el);
  setTimeout(()=>el.remove(),7000);
}

function scrollToBigAlert(){
  navGo('navAlerts');
}

/* ---------- misc interactive: switches, source toggles, settings, report, help ---------- */
function toggleSwitch(el){ el.classList.toggle('on'); persistSettings(); }
function toggleSource(el){
  el.classList.toggle('off');
  const state = el.classList.contains('off') ? t('source_toggle_off') : t('source_toggle_on');
  showToast('info',t('source_label'), `${el.dataset.src} ${state} ${t('source_in_analysis')}`);
}
function saveSettings(){
  persistSettings();
  showToast('info',t('settings_saved_title'),t('settings_saved_body'));
}
function openSensorDetailModal(){
  const s=sensors[selectedSensorIndex];
  openModal(`${t('sensor_detail_title')} ${s.id}`,`
    <div class="mrow"><span>${t('detail_location')}</span><b>${s.name}, ${t('detail_thai')}</b></div>
    <div class="mrow"><span>${t('detail_type')}</span><b>${s.type}</b></div>
    <div class="mrow"><span>${t('status')}</span><b>${statusLabel[s.status]}</b></div>
    <div class="mrow"><span>${t('vibration')}</span><b>${document.getElementById('infoVib').textContent}</b></div>
    <div class="mrow"><span>${t('displacement')}</span><b>${document.getElementById('infoDisp').textContent}</b></div>
    <div class="mrow"><span>${t('soil_moisture')}</span><b>${document.getElementById('infoMoist').textContent}</b></div>
    <div class="mrow"><span>${t('soil_pressure')}</span><b>${document.getElementById('infoPress').textContent}</b></div>
    <div class="mrow"><span>${t('risk')}</span><b>${document.getElementById('infoRisk').textContent}</b></div>
  `);
}
function downloadReport(){
  const genTime=new Date().toLocaleString(currentLang==='en'?'en-US':'th-TH');
  const lines=[
    t('report_title'),
    `${t('report_created')}: ${genTime}`,
    ``,
    `${t('report_total')}: 128`,
    `${t('report_online')}: ${document.getElementById('onlineCount').textContent}`,
    `${t('report_offline')}: ${document.getElementById('offlineCount').textContent}`,
    `${t('report_abnormal')}: ${document.getElementById('abnormalCount').textContent}`,
    `${t('report_alerts_today')}: ${document.getElementById('alertTodayCount').textContent}`,
    ``,
    `${t('report_risk_score')}: ${document.getElementById('riskPct').textContent}`,
    `${t('report_mag_pred')}: ${document.getElementById('predMag').textContent}`,
    `${t('report_conf')}: ${document.getElementById('predConf').textContent}`,
    ``,
    t('report_sensor_list'),
    ...fullSensorData.map(r=>`  ${r.id} | ${r.loc} | ${statusTxtMap[r.status]} | vib ${r.vib.toFixed(1)} mm/s`),
  ];
  const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download='earthquake_report_'+Date.now()+'.txt';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  showToast('info',t('report_downloaded_title'),t('report_downloaded_body'));
}
function openHelpModal(){
  openModal(t('help_title'),`
    <div style="margin-bottom:8px"><b>${t('help_map_title')}</b> ${t('help_map_body')}</div>
    <div style="margin-bottom:8px"><b>${t('help_stat_title')}</b> ${t('help_stat_body')}</div>
    <div style="margin-bottom:8px"><b>${t('help_sim_title')}</b> ${t('help_sim_body')}</div>
    <div style="margin-bottom:8px"><b>${t('help_settings_title')}</b> ${t('help_settings_body')}</div>
    <div><b>${t('help_report_title')}</b> ${t('help_report_body')}</div>
  `);
}

/* ==================== LAND SUBSIDENCE PREDICTION — WEATHER & HUMIDITY SIMULATION ==================== */
const soilCoeff={clay:1.4,peat:2.0,loam:1.0,sand:0.5};
const subsState={ day:0, moist:32, airHum:65, gw:-12.0, rate:4.0, cum:0.0 };
const subsEvent={ active:false, timer:null, timeLeft:0, intensity:0, alertFired:false };
const subsChartData={moist:[],air:[],gw:[],rate:[]};
const subsChartColor={moist:'#a855f7',air:'#00549e',gw:'#00728f',rate:'#b5541c'};
function seedSubsCharts(){
  subsChartData.moist=Array.from({length:40},()=>subsState.moist);
  subsChartData.air=Array.from({length:40},()=>subsState.airHum);
  subsChartData.gw=Array.from({length:40},()=>subsState.gw);
  subsChartData.rate=Array.from({length:40},()=>subsState.rate);
}
seedSubsCharts();
function drawSubSpark(id){
  const c=document.getElementById('c-sub-'+id);
  if(!c) return;
  const cx=c.getContext('2d');
  c.width=c.clientWidth*devicePixelRatio;
  c.height=c.clientHeight*devicePixelRatio;
  const data=subsChartData[id];
  const min=Math.min(...data), max=Math.max(...data);
  const range=(max-min)||1;
  cx.clearRect(0,0,c.width,c.height);
  cx.beginPath();
  data.forEach((v,i)=>{
    const x=(i/(data.length-1))*c.width;
    const y=c.height - ((v-min)/range)*c.height*0.85 - c.height*0.075;
    i===0?cx.moveTo(x,y):cx.lineTo(x,y);
  });
  cx.strokeStyle=subsChartColor[id];
  cx.lineWidth=2*devicePixelRatio;
  cx.stroke();
  cx.lineTo(c.width,c.height);cx.lineTo(0,c.height);cx.closePath();
  const grad=cx.createLinearGradient(0,0,0,c.height);
  grad.addColorStop(0,subsChartColor[id]+'55');
  grad.addColorStop(1,subsChartColor[id]+'00');
  cx.fillStyle=grad;
  cx.fill();
}
function drawAllSubSparks(){ ['moist','air','gw','rate'].forEach(drawSubSpark); }

const subsProvinceProfiles=[
  {th:'กรุงเทพมหานคร',en:'Bangkok',susc:1.35},
  {th:'สมุทรปราการ',en:'Samut Prakan',susc:1.5},
  {th:'สมุทรสาคร',en:'Samut Sakhon',susc:1.45},
  {th:'นนทบุรี',en:'Nonthaburi',susc:1.2},
  {th:'ปทุมธานี',en:'Pathum Thani',susc:1.15},
  {th:'พระนครศรีอยุธยา',en:'Ayutthaya',susc:1.05},
];

function subsSliderLabels(){
  document.getElementById('subsRainVal').textContent=document.getElementById('subsRainRange').value;
  document.getElementById('subsHumVal').textContent=document.getElementById('subsHumRange').value;
  document.getElementById('subsTempVal').textContent=document.getElementById('subsTempRange').value;
  document.getElementById('subsExtractVal').textContent=document.getElementById('subsExtractRange').value;
  document.getElementById('subsHorizonVal').textContent=document.getElementById('subsHorizon').value;
  document.getElementById('fHorizonLbl').textContent=(currentLang==='en'?'Predicted subsidence over ':t('subs_f_horizon')+' ')+document.getElementById('subsHorizon').value+(currentLang==='en'?' years':' ปี');
}
subsSliderLabels();
function onSubsSliderInput(){ subsSliderLabels(); }
function onSubsWeatherChange(){ subsSliderLabels(); updateSubsForecast(); }

function syncSubsEventLabels(){
  document.getElementById('subsEvSeverityVal').textContent=document.getElementById('subsEvSeverityRange').value;
  document.getElementById('subsEvDepthVal').textContent=document.getElementById('subsEvDepthRange').value;
  document.getElementById('subsEvDurVal').textContent=document.getElementById('subsEvDurRange').value;
  document.getElementById('subsEvRadiusVal').textContent=document.getElementById('subsEvRadiusRange').value;
}
syncSubsEventLabels();

function subsRiskLevel(rateMmYr){
  if(rateMmYr<5) return 'low';
  if(rateMmYr<15) return 'med';
  if(rateMmYr<30) return 'high';
  return 'sev';
}
function subsRiskLabel(level){
  return level==='sev' ? t('subs_risk_sev') : level==='high' ? t('risk_high2') : level==='med' ? t('risk_med') : t('risk_low');
}

/* continuous background weather/humidity dynamics — always running, no start button needed */
function subsBackgroundTick(){
  const rain=parseFloat(document.getElementById('subsRainRange').value);
  const humBaseline=parseFloat(document.getElementById('subsHumRange').value);
  const temp=parseFloat(document.getElementById('subsTempRange').value);
  const extract=parseFloat(document.getElementById('subsExtractRange').value);
  const soil=document.getElementById('subsSoilType').value;
  const coeff=soilCoeff[soil]||1;

  /* air humidity: drifts toward baseline, lifted by rain, lowered by heat */
  const airTarget = humBaseline + rain*0.6 - temp*0.3;
  subsState.airHum += (airTarget - subsState.airHum)*0.15 + (Math.random()-0.5)*1.5;
  subsState.airHum = Math.min(100, Math.max(10, subsState.airHum));

  /* topsoil moisture: recharged by rain & air humidity, depleted by heat + groundwater drawdown */
  const evap=Math.max(0, 0.16*temp - 0.05*subsState.airHum);
  subsState.moist += rain*0.35 - evap - extract*0.015 + (Math.random()-0.5)*0.6;
  subsState.moist = Math.min(100, Math.max(3, subsState.moist));

  /* groundwater level (m below surface, more negative = deeper) */
  subsState.gw += rain*0.0035 - extract*0.008 + (Math.random()-0.5)*0.02;
  subsState.gw = Math.min(-1, Math.max(-60, subsState.gw));

  /* baseline subsidence rate driven by soil compressibility, drawdown & dryness */
  let rate = coeff*(extract*0.09)*(1 - subsState.moist/100) + coeff*Math.max(0,(-subsState.gw-8))*0.12 - rain*0.06;
  rate = Math.max(0, rate);

  /* discrete subsidence-event boost, only while an event simulation is active */
  if(subsEvent.active){
    const boost=subsEvent.intensity;
    rate += boost*40 + Math.random()*3;
    subsState.moist = Math.max(3, subsState.moist - boost*1.2);
    subsState.gw -= boost*0.15;
  }

  subsState.rate += (rate - subsState.rate)*(subsEvent.active?0.6:0.3);
  subsState.cum += subsState.rate/365;
  subsState.day++;
}

function tickSubsUI(){
  document.getElementById('gMoist').textContent=Math.round(subsState.moist)+'%';
  document.getElementById('gAirHum').textContent=Math.round(subsState.airHum)+'%';
  document.getElementById('gGw').textContent=subsState.gw.toFixed(1)+'m';
  document.getElementById('gRate').textContent=subsState.rate.toFixed(1);

  subsChartData.moist.push(subsState.moist);
  subsChartData.air.push(subsState.airHum);
  subsChartData.gw.push(subsState.gw);
  subsChartData.rate.push(subsState.rate);
  ['moist','air','gw','rate'].forEach(id=>{ if(subsChartData[id].length>40) subsChartData[id].shift(); });
  drawAllSubSparks();

  document.getElementById('sv-moist').textContent=Math.round(subsState.moist);
  document.getElementById('sv-air').textContent=Math.round(subsState.airHum);
  document.getElementById('sv-gw').textContent=subsState.gw.toFixed(1);
  document.getElementById('sv-rate').textContent=subsState.rate.toFixed(1);

  document.getElementById('fDay').textContent=subsState.day;
  document.getElementById('fCum').textContent=subsState.cum.toFixed(1)+' mm';

  updateSubsForecast();
  renderSubsRank();
}

function updateSubsForecast(){
  const years=parseFloat(document.getElementById('subsHorizon').value);
  const projectedCm = (subsState.cum + subsState.rate*years)/10;
  document.getElementById('fHorizon').textContent=projectedCm.toFixed(1)+' cm';
  const level=subsRiskLevel(subsState.rate);
  const badge=document.getElementById('fRiskBadge');
  badge.className='subs-badge '+level;
  badge.textContent=subsRiskLabel(level);
}

function renderSubsRank(){
  const wrap=document.getElementById('subsRankList');
  const rows=subsProvinceProfiles.map(p=>{
    const rate=subsState.rate*p.susc;
    return {name: currentLang==='en'?p.en:p.th, rate};
  }).sort((a,b)=>b.rate-a.rate);
  wrap.innerHTML='';
  rows.forEach(r=>{
    const level=subsRiskLevel(r.rate);
    const div=document.createElement('div');
    div.className='r-item '+level;
    div.innerHTML=`<div class="r-name">${r.name}<div class="r-sub">${subsRiskLabel(level)}</div></div><div class="r-val" style="color:${level==='sev'?'var(--red)':level==='high'?'var(--orange)':level==='med'?'var(--yellow)':'var(--green)'}">${r.rate.toFixed(1)} mm/yr</div>`;
    wrap.appendChild(div);
  });
}

/* ---------- discrete land-subsidence event simulation (alerts fire only when this runs) ---------- */
function updateSubsEventStatus(){
  document.getElementById('subsEvStatus').textContent = subsEvent.active
    ? `${t('subs_event_running')} ${subsEvent.timeLeft}s`
    : t('subs_event_ready');
}
function startSubsEvent(){
  if(subsEvent.active) return;
  subsEvent.active=true;
  subsEvent.alertFired=false;
  const severity=parseFloat(document.getElementById('subsEvSeverityRange').value);
  const depth=document.getElementById('subsEvDepthRange').value;
  const radius=document.getElementById('subsEvRadiusRange').value;
  subsEvent.intensity=Math.min(1, severity/60);
  subsEvent.timeLeft=parseInt(document.getElementById('subsEvDurRange').value);
  document.getElementById('subsEvBtnStart').disabled=true;
  document.getElementById('subsEvBtnStop').disabled=false;
  updateSubsEventStatus();
  const startMsg = currentLang==='en'
    ? `Severity ${severity} cm • Depth ${depth} m • Duration ${subsEvent.timeLeft}s • Radius ${radius} km`
    : `ความรุนแรง ${severity} ซม. • ความลึก ${depth} ม. • ระยะเวลา ${subsEvent.timeLeft} วิ • รัศมี ${radius} กม.`;
  showToast('info', t('subs_event_started_title'), startMsg);
  subsEvent.timer=setInterval(()=>{
    subsEvent.timeLeft--;
    updateSubsEventStatus();
    if(subsEvent.timeLeft<=0) stopSubsEvent();
  },1000);
}
function stopSubsEvent(){
  const wasActive=subsEvent.active;
  subsEvent.active=false;
  subsEvent.intensity=0;
  clearInterval(subsEvent.timer);
  document.getElementById('subsEvBtnStart').disabled=false;
  document.getElementById('subsEvBtnStop').disabled=true;
  updateSubsEventStatus();
  if(wasActive) showToast('info', t('subs_event_stopped_title'), t('subs_event_stopped_body'));
}
function resetSubsEvent(){
  stopSubsEvent();
  Object.assign(subsEvent,{timeLeft:0,intensity:0,alertFired:false});
  document.getElementById('subsEvSeverityRange').value=15;
  document.getElementById('subsEvDepthRange').value=6;
  document.getElementById('subsEvDurRange').value=30;
  document.getElementById('subsEvRadiusRange').value=5;
  syncSubsEventLabels();
  document.getElementById('subsLastEventArea').textContent=t('subs_no_event');
  document.getElementById('subsLastEventTime').textContent='--:--:--';
  document.getElementById('subsLastEventSeverity').textContent='-';
  showToast('info',t('reset_done_title'),t('reset_done_body'));
}

/* ---------- alert + notification dispatch (fires only from the event simulation above) ---------- */
let subsLastEvent=null;
function fireSubsidenceAlert(){
  const timeStr=document.getElementById('clock').textContent;
  const top=subsProvinceProfiles.slice().sort((a,b)=>b.susc-a.susc)[0];
  const area = currentLang==='en'?top.en:top.th;
  const severity=parseFloat(document.getElementById('subsEvSeverityRange').value);

  subsLastEvent={area,severity,timeStr};
  document.getElementById('subsLastEventArea').textContent=area;
  document.getElementById('subsLastEventTime').textContent=timeStr;
  document.getElementById('subsLastEventSeverity').textContent=severity.toFixed(0)+' cm';

  showToast('info', t('subs_alert_title'), `${t('subs_msg_detected')} ${area} ${t('subs_msg_severity')} ${severity.toFixed(0)} cm ${t('subs_msg_time')} ${timeStr}`);
  sendSubsNotifications(area,severity,timeStr);
}
function sendSubsNotifications(area,severityCm,timeStr){
  const emailOn=document.getElementById('switchEmail').classList.contains('on');
  const lineOn=document.getElementById('switchLine').classList.contains('on');
  const browserOn=document.getElementById('switchBrowser').classList.contains('on') && ('Notification' in window) && Notification.permission==='granted';
  const email=document.getElementById('alertEmail').value || t('no_email_set');
  const msg=`${t('subs_msg_detected')} ${area} ${t('subs_msg_severity')} ${severityCm.toFixed(0)} cm ${t('subs_msg_time')} ${timeStr}`;

  if(emailOn) sendSubsEmail(area,severityCm,timeStr,email,msg);
  if(lineOn) sendRealLine(msg);
  if(browserOn) sendBrowserNotification(`${t('subs_alert_title')} — ${area}`, msg);
  if(!emailOn && !lineOn && !browserOn) showToast('info',t('notif_no_channel_title'),t('notif_no_channel_body'));
}
function sendSubsEmail(area,severityCm,timeStr,email,msg){
  const pub=document.getElementById('ejsPublicKey').value.trim();
  const svc=document.getElementById('ejsServiceId').value.trim();
  const tpl=document.getElementById('ejsTemplateId').value.trim();
  if(!pub||!svc||!tpl||!window.emailjs){
    showToast('info',t('email_sent_title'),t('ejs_not_configured'));
    return;
  }
  try{
    emailjs.init({publicKey:pub});
    emailjs.send(svc,tpl,{ to_email:email, area:area, magnitude:severityCm.toFixed(0)+' cm', time:timeStr, message:msg })
      .then(()=>showToast('email',t('email_sent_title'),`${t('to_label')}: ${email}\n${msg}`))
      .catch(err=>{ console.error('EmailJS error:',err); showToast('email',t('email_sent_title'),t('email_send_failed')); });
  }catch(err){
    console.error('EmailJS error:',err);
    showToast('email',t('email_sent_title'),t('email_send_failed'));
  }
}

function subsMasterTick(){
  subsBackgroundTick();
  tickSubsUI();
  if(subsEvent.active){
    const level=subsRiskLevel(subsState.rate);
    if((level==='sev' || level==='high') && !subsEvent.alertFired){
      subsEvent.alertFired=true;
      fireSubsidenceAlert();
    }
  }
}
setInterval(subsMasterTick,1000);
drawAllSubSparks();
tickSubsUI();
window.addEventListener('resize',drawAllSubSparks);

/* ---------- init theme + language + auth + settings on load ---------- */
initTheme();
loadSettings();
loadAlertHistory();
renderAlertList();
applyLanguage();
initAuth();

/* ---------- subtle button ripple micro-interaction (additive, non-breaking) ---------- */
(function(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const RIPPLE_SEL='button, .info-btn, .switch, .icon-toggle, .admin, .lang-toggle, .detail-btn';
  document.addEventListener('click', function(e){
    const el = e.target.closest(RIPPLE_SEL);
    if(!el || el.disabled) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.width = span.style.height = size + 'px';
    span.style.left = (e.clientX - rect.left - size/2) + 'px';
    span.style.top = (e.clientY - rect.top - size/2) + 'px';
    const prevPos = getComputedStyle(el).position;
    if(prevPos === 'static') el.style.position = 'relative';
    el.appendChild(span);
    span.addEventListener('animationend', ()=> span.remove());
  }, true);
})();
