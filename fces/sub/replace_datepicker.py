import re

# Read the calendar HTML template
with open('/Users/ijaegwang/wordncode/Work/ㅎ/한국건강가정진흥원/fces/sub/temp_calendar.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    
# Extract only the krds-calendar-area inner HTML (lines 6 to 116)
# Actually, we can just grab from <div class="krds-calendar-area"> to </div>
calendar_area = "".join(lines[6:116])

# Construct the two calendar blocks
calendar_1 = f"""                                <div class="calendar-conts">
                                    <div class="input-date-wrap">
                                        <input type="text" class="krds-input form-btn-datepicker datepicker cal" style="width: 140px;" value="2026.04.20" placeholder="YYYY.MM.DD" title="시작일" readonly>
                                        <button type="button" class="btn-cal form-btn-datepicker"><span class="sr-only">시작일 선택</span></button>
                                    </div>
{calendar_area}                                </div>"""

calendar_2 = f"""                                <div class="calendar-conts">
                                    <div class="input-date-wrap">
                                        <input type="text" class="krds-input form-btn-datepicker datepicker cal" style="width: 140px;" value="2026.04.24" placeholder="YYYY.MM.DD" title="종료일" readonly>
                                        <button type="button" class="btn-cal form-btn-datepicker"><span class="sr-only">종료일 선택</span></button>
                                    </div>
{calendar_area}                                </div>"""

# Read FE_SE_0019.html
with open('/Users/ijaegwang/wordncode/Work/ㅎ/한국건강가정진흥원/fces/sub/FE_SE_0019.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the target
target = """                                <div class="date-input">
                                    <input type="text" value="2026.04.20" readonly title="시작일">
                                    <i class="svg-icon ico-calendar"></i>
                                </div>
                                <span class="dash">~</span>
                                <div class="date-input">
                                    <input type="text" value="2026.04.24" readonly title="종료일">
                                    <i class="svg-icon ico-calendar"></i>
                                </div>"""

replacement = f"""{calendar_1}
                                <span class="dash">~</span>
{calendar_2}"""

new_html = html.replace(target, replacement)

# Write back
with open('/Users/ijaegwang/wordncode/Work/ㅎ/한국건강가정진흥원/fces/sub/FE_SE_0019.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Replacement done.")
