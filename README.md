
<h2>������ �������</h2>
ֳ������ ����: http://brovary-rada.gov.ua/documents/ <br/>
��� ������� ������� ������������ ����������� ������ ��������� ����� ������� 
��������� ����� ������� ���������. ��� ����� ���������� � ���� ����� ������ ������ 
������ ��� ��� ����� �������. ���� � ��� ���� ����� ��� ������� � ������ 
<code>sourceId</code>, ���� �������� � ������ ��� ���������. ���� � ������� ���
���� �������� � ��� ����� �� ����������� ����� � � ��� �������� ���������� 
���������� �� ������, ���� � ������ ���� ���������� ���������� � ����. ������� 
���������� POST ������� �� �� ��������������.<br/>
Back-end ����� ���� ���� �������� ���� ���������. �������������, �� ���� 
����������� ���������� �� ������� ���� ������������ �� �볺������ ������ � 
������������� JavaScript �������.

<h2>���� �����</h2>
���� SQLite ���������� ��������� �������� ������� ���� �����, �� ������ 
������� ������� � ��� ������. <br/>

������� [documents]: <br/>
<code>[sourceId] integer</code> - ��������� ����, ��������� ���� 
http://brovary-rada.gov.ua/documents/{sourceId}.html <br/>
<code>[name] text</code> - ����� ������ ����� ����<br/>
<code>[deleted] datetime</code> - ���� ��������� ���������<br/>

������� [versions]: <br/>
<code>[id] integer</code> - ��������� ���� <br/>
<code>[sourceId] integer</code> - ������� ���� �� ������� [documents]<br/>
<code>[text] text</code> - ����� ������ ����� ����<br/>
<code>[updated] datetime</code> - ���� ��������� �������� ����<br/>

<h2>�������</h2>
<h3>������������ �������������</h3>

������������ ������������� ��������� ���������� ������ POST ������ �� 
���������� <code>SheluderController</code>. � �� ������ ��������� 
�������� ��������, ��� ���� ������������ � TimeSpan 
(<code>[��].[������]:[�������]:[�������]</code>): <br/>
<br/>
<code>POST /api/sheluder/update HTTP/1.1</code><br/>
<code>Content-Type: application/json</code><br/>
<code>"1.10:00:21"</code><br />
�� ������������� ������� ���� ���������� ���� 3 ������.

<h3>������ ������ �������</h3>
������ ���������� ������ POST ������ �� ����������� <code>UpdateController</code>.<br/>
<code>POST /api/update/all HTTP/1.1</code><br/>
� ����� ������ ��������� ���� ������� ���� ��� ������������� ������������ (OAuth, ����).

<h2>������ �� ���������� ���������</h2>
������ �� ���������� ��������� ���������� ������ GET ������ �� ���������� 
<code>DocumentController</code>.<br/> 
������ �� ������ � ���������� ��������� ����������� GET ������� �� 
<code>api/documents</code>. ������ �������� ��������� ��� �������������: <br />
<code>amount</code> (int) - ������� ���������<br/>
<code>page</code> (int) - ������� (������� ���������� �������� = amount * page)<br/>
<code>deleted</code> (boolean) - ���������, �� ������, �� �������<br/>
<code>inclVers</code> (boolean) - �� ��������� ��������� ���� ���������<br/>
������ �� ����������� ���������, ���������� ����� ������ ��� ����������� 
GET ������� �� <code>api/documents/{sourceId}</code>

<h2>�볺������ �������</h2>
�볺������ ������� ���������� � ������������� Angular2. ��� ������ ��������� 
������ ���������� ���� ����. ��� ����������� ����� ��������� � ������ 
��������������� �������� google-diff-match-patch.

<h2>Docker</h2>
������ ��� ������ ��������� �� Linux-���������. �� ������ Dockerfile ���� ����� 
<a href="https://hub.docker.com/r/microsoft/aspnetcore-build/">1.1.2-jessie</a>. 
������� ������ ��� ���������� �������: <br />
1. dotnet restore Devchallenge_semifinal.sln - ���������� NuGet-������. <br />
2. dotnet publish Devchallenge_semifinal.sln - ��������� ������� 
(������ ����� �������������������� � ���������) <br />
3. docker-compose build - ��������� �� ������������ ���������� (node.js, npm install) <br />
3. docker-compose up

<h2>���������� ������� ��������</h2>
<a href="https://github.com/AngleSharp/AngleSharp">AngleSharp</a>, 
<a href="https://code.google.com/archive/p/google-diff-match-patch/">google-diff-match-patch</a>, 
<a href="https://www.quartz-scheduler.net">Quartz.NET</a>
