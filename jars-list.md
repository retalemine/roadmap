###Barcode:
* net.glxn.qrgen.QRCode
* net.glxn.qrgen.image.ImageType
* com.google.zxing.BarcodeFormat
* com.google.zxing.client.j2se.MatrixToImageWriter
* com.google.zxing.common.BitMatrix
* com.google.zxing.oned.Code39Writer

---
###Spring configuration:
web.xml
```
	<listener>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
		starts Spring container -> reads that file, finds your classes, instantiates them and wires
	</listener>
	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>
			classpath:*.xml </param-value>
	</context-param>
```	
*.xml
```
	<import resource="classpath:*.xml" />
	<util:properties id="*" location="classpath:*.properties" />
	<util:list id="applicationPropertyFiles">
		<value>classpath:*.properties</value>
		<value>classpath:*.properties</value>		
	</util:list>
	<context:component-scan base-package="com.*" />
	<bean id="*" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer" >
		<property name="locations">
			<list>
				<value>classpath:*.properties</value>
				<value>classpath:*.properties</value>
			</list>
    	</property>
		<property name="ignoreUnresolvablePlaceholders" value="true"/>
	</bean>
	<bean id="*" class="org.springframework.beans.factory.config.MethodInvokingFactoryBean">
		<property name="targetClass" value="org.springframework.util.Log4jConfigurer" />
		<property name="targetMethod" value="initLogging" />
		<property name="arguments">
			<list>
				<value>classpath:log4j.properties</value>
			</list>
		</property>
	</bean>
	<bean id="*" class="com.*Service">
		<constructor-arg index="0" value="${key#}" />
	</bean>
	<bean id="*" class="com.*Service">
		<property name="memberVar#" ref="ref*" />
		<property name="memberVar#" value="*" />
	</bean>	
	
	<bean id="DataSource" class="org.springframework.jndi.JndiObjectFactoryBean">
		<property name="jndiName" value="JbossDSName#" />
	</bean>
	<bean id="SqlMapClient" class="org.springframework.orm.ibatis.SqlMapClientFactoryBean">
		<property name="configLocation">
			<value>classpath:SqlMapConfig.xml</value>
		</property>
		<property name="dataSource" ref="DataSource" />
		<property name="useTransactionAwareDataSource" value="true" />
		<property name="transactionConfigProperties"> 
			<props>
				<prop key="DefaultAutoCommit">false</prop> 
			</props> 
		</property>
	</bean> 
	<bean id="*ServiceDao" class="com.*ServiceDaoImpl">
		<property name="sqlMapClient" ref="SqlMapClient" />
	</bean>	
	
	<jee:jndi-lookup id="jmsConnectionFactory*" jndi-name="ClusteredXAConnectionFactory" environment-ref="jmsJndiProperties*" />
	<bean id="cachedConnectionFactory" class="com.*.CachedConnectionFactory*">
		<constructor-arg index="0" ref="jmsConnectionFactory*" />
		<constructor-arg index="1" value="2" />
		<constructor-arg index="2" value="60000" />
	</bean>
	<bean id="secureConnectionFactory" class="org.springframework.jms.connection.UserCredentialsConnectionFactoryAdapter">
		<property name="targetConnectionFactory" ref="cachedConnectionFactory" />
		<property name="username" value="key1#" />
		<property name="password" value="key2#" />
	</bean>

	<!-- Outgoing Message -->
	<jee:jndi-lookup id="OutDestination" jndi-name="JMSQueueName#" environment-ref="jndi-jms.properties" />
	<bean id="OutDestinationTemplate" class="com.*.JmsTemplate*">
		<property name="connectionFactory" ref="secureConnectionFactory" />
		<property name="receiveTimeout" value="30000" />
		<property name="defaultDestination" ref="OutDestination" />
		<property name="sessionTransacted" value="true" />
	</bean>
	<bean id="*Sender" class="com.*.SenderImpl">
        <property name="senderName" value="##" />
        <property name="jmsTemplate" ref="OutDestinationTemplate" />
	</bean>
	
	<!--  incoming olf migration status message -->
	<jee:jndi-lookup id="InStatusDestination" jndi-name="JMSQueueName#" environment-ref="jndi-jms.properties"/>
	<bean id="jmsDestinationResolver" class="org.springframework.jms.support.destination.BeanFactoryDestinationResolver" />
	<jms:listener-container connection-factory="secureConnectionFactory" destination-resolver="jmsDestinationResolver" acknowledge="transacted">
		<jms:listener destination="InStatusDestination" ref="*StatusListener" method="receiveMessage" />
	</jms:listener-container>	
	<bean id="*StatusListener" class="com.*MessageListener">
        <property name="listenerName" value="##" />
        <property name="service" ref="*Service" />
	</bean>
	--
	<bean id="jbossTransactionManager" class="org.springframework.jndi.JndiObjectFactoryBean">
        <property name="jndiName" value="java:TransactionManager" />
    </bean> 
	<bean id="transactionManager" class="org.springframework.transaction.jta.JtaTransactionManager">
		<property name="transactionManager" ref="jbossTransactionManager"/> 
		<property name="allowCustomIsolationLevels">
			<value>true</value>
		</property>
	</bean>
	<tx:advice id="txListenerAdvice" transaction-manager="transactionManager">
		<tx:attributes>
			<tx:method name="*receiveMessage" propagation="REQUIRED" read-only="false" rollback-for="com.*Exception"/>
		</tx:attributes>
	</tx:advice>	
	<aop:config>
		<aop:pointcut id="txListener_Tx"
			expression="execution(* com.*receiveMessage(..))" />		
		<aop:advisor advice-ref="txListenerAdvice" pointcut-ref="txListener_Tx" />	
	</aop:config>
```	
jndi-jms.properties:
```
	java.naming.factory.initial=org.jnp.interfaces.NamingContextFactory
	java.naming.factory.url.pkgs=org.jnp.interfaces:org.jboss.naming
	java.naming.provider.url=localhost:1099
```
