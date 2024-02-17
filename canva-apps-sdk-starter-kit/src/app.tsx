import {
  Button,
  ColorSelector,
  FormField,
  NumberInput,
  RadioGroup,
  Rows,
  Select,
  Text,
  TextInput,
  Title,
} from "@canva/app-ui-kit";
import { initAppElement } from "@canva/design";
import React from "react";
import styles from "styles/components.css";
import * as llm from "./llm"
import { addPage } from "@canva/design";

type FontWeight = "normal" | "bold";
type FontStyle = "normal" | "italic";
type Decoration = "none" | "underline";
type TextAlign = "start" | "center" | "end";

type AppElementData = {
  text: string;
  color: string;
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  decoration: Decoration;
  textAlign: TextAlign;
  width: number;
  rotation: number;
  useCustomWidth: boolean;
};

type UIState = AppElementData;

const initialState: UIState = {
  text: "Hello world",
  color: "#ff0099",
  fontWeight: "normal",
  fontStyle: "normal",
  decoration: "none",
  textAlign: "start",
  width: 250,
  rotation: 0,
  useCustomWidth: false,
};


const appElementClient = initAppElement<AppElementData>({
  render: (data) => {
    return [
      {
        type: "TEXT",
        top: 0,
        left: 0,
        ...data,
        width: data.useCustomWidth ? data.width : undefined,
        children: [data.text],
      },
    ];
  },
});

const renderResponse = async () => {
  try {
    // Assume fetchData is an async function that fetches data from an API
    let extracted_text = `
    SOCIAL Islamophobia and Public Health in the United States Islamophobia United Goleen Samari, PhD, MPH, MA Anti-Muslim sentiments are increasingly common globally and in the United States. The Goleen Samari, PhD, MPH, Anti-Muslim sentiments are increasingly common globally and in the United States. The recent rise in Islamophobia calls for a public health perspective that considers the stig- matized identity of Muslim Americans and health implications of Islamophobic discrimi- nation.Drawingona stigma, discrimination, andhealthframework, I expandthedialogueon the rise of Islamophobia to a discussion of how Islamophobia affects the health of Muslim Americans. Islamophobia can negatively inﬂuence health by disrupting several systems— individual (stress reactivity andidentity concealment), interpersonal (social relationships and socialization processes), and structural (institutional policies and media coverage). Islam- ophobia deserves attention as a source of negative health outcomes and health disparities. Future public health research should explore themultilevel andmultidimensional pathways between Islamophobia and population health. (Am J Public Health. 2016;106:1920–1925. doi:10.2105/AJPH.2016.303374) recent rise in Islamophobia calls for a public health perspective that considers the stig- matized identity of Muslim Americans and health implications of Islamophobic discrimi- nation. Drawing a stigma, discrimination, and health Framework, |expand the dialogue on the rise of Islamophobia to a discussion how Islamophobia affects the health Muslim Americans. Islamophobia can negatively influence health by disrupting several systems— individual (stress reactivity and concealment), interpersonal (social relationships and socialization processes), and structural (institutional policies and media coverage). ophobia deserves attention a source of negative health outcomes and health disparities. Future public health research should explore the multilevel and multidimensional pathways between Islamophobia and population health. (Am J Public Health. 2016;106:1920-1925. doi:10.2105/AJPH.201 6.303374) We cannot turn against one another by letting this ﬁght be deﬁned as a war between America ‘We cannot turn this fight be defined as a and Islam. and Islam. Fueled by the ongoing crisis in Syria, the —President Barack Obama Fueled ongoing crisis Syria, recent attacks in Paris, San Bernardino, and Brussels, and anti-Muslim rhetoric from politicians, anti-Muslim sentiments have been rising.1,2 attacks Brussels, politicians, Paris, anti-Muslim Bernardino, from sentiments have Hate crimes against Muslims 5 times more 2001 been rising.’* Hate crimes against Muslims United States in the United States remain 5 times more common than before September 11, 2001 common than before September (9/11), and although overall hate crimes in America dipped in 2014, anti-Muslim hate crimes rose by 14% over the prior year.1 Islamophobia—a hatred of Islam or a stig- matization, fear, and dislike ofMuslims—is pervasive.3 crimes rose by 14% over the prior year.' Islamophobia—a hatred of Islam a stig- matization, fear, and dislike ofMuslims—is pervasive.? From From the 2015 Chapel Hill, 2015 Chapel Hill, North Carolina, shooting of 3 Muslims4 North Carolina, shooting of3Muslims* to to Ahmed Mohamed’s removal from school because ofhis “bomb” clock,5 Ahmed Mohamed’s removal from school beriee ofhis“bomb” clock,” we repeatedly 220 we repeatedly see examples of Islamophobia, yet as public health researchers we pay little attention to the health implications of Islamophobia. Islam is the world’s second largest re- ligion.6 Estimates of the USieUS Muslim pop- 277171 ef Slamophobia, yet as public uealth researchers we pay little attention ta the health imelicytions of Islamophobia. Tuo... Pet Nac tat st world’s second largest re- pop- ulation, which vary widely, average around 3.3 million, a ﬁgure that includes equal numbers ofAfrican Americans, South Asians, and Arabs.7 dilation, which ~~--“:1y, average around 3.3 lea ©flere ch2t zncludes equal moe qo, 4...2-1cans, South Asians, cod suebe’ By “i, By 2050, Muslims will be the *taslims will be the second largest faith group in the country.6 ween carseat f7 +p in the country.® 1920 Perspectives From the Social Sciences ABOUT THE AUTHOR THE Goleen Samari is with the Population Research Center, University ofTexas at Austin. Goleen Samari is with the Population Research Center, University of Texas at Austin. Correspondence should be sent to Goleen Samari, PhD, MPH, MA, Population Research Center, University ofTexas at Correspondence should be sent to Goleen Samari, PhD, MPH, MA, Population Research Center, University of Texas at Austin, 305 E 23rd St, Austin, TX78712-1699. Reprints can be ordered at http://www.ajph.org by clicking the “Reprints” link. This article was accepted July 6, 2016. doi: 10.2105/AJPH.2016.303374doi:10.2105/AJPH.2016.303374 article accepted July 6, 2016. ‘°C 7.,,<nectives From the Social Sciences Peer Reviewed Reviewed Samari Samari AJPH AJPH November 2016, Vol 106, No. 11 November 2016, Vol 106, 11 Austin, 305E 23rd St, Austin, TX 78712-1699. Reprints can be ordered at http://www.ajph.org by clicking the “Reprints” link. (9/11), and although overall hate crimes in America dipped in 2014, anti-Muslim hate —President Barack Obama letting war between America Islam has grown rapidly in the United States because of high rates of immigration, births, Islam has grown rapidly because rates and conversions.®” The past 2 decades, 15 of 22 Middle East countries have had pro- conversions.6,7 States immigration, births, past 2 decades, 15 22 Middle East countries have had longed conﬂicts, leading to large numbers longed conflicts, leading to large numbers of displaced individuals—many of whom are Muslims. However, Muslim Americans are of varied nativity and a third are third generation or higher, indicating a long history in the United States.’ displaced individuals—many Muslims. However, varied higher, States.7 Parallel to the Parallel to the growth of the number of the number Muslim Americans, Islamophobia has been increasing.3 Americans, has been increasing.’ Muslims have college campuses, dalized and defaced, assets frozen, Muslims have been harassed on harassed college campuses, mosques have been van- dalized and defaced, Muslim charities have have van- charities have had their assets frozen, and racial proﬁling has occurred at airports and on the streets.1,8 racial profiling has occurred airports and on The streets.'"* The marginalization of Muslim Americans chal- lenges health equity and may have important health implications. Important questions equity Americans have remain—how has the climate of Islam- ophobia in the United States affected the climate Islam- health of the growing population ofMuslim Americans, and how does a public health health the growing Americans, does public marginalization lenges health implications. Important questions remain—how has ophobia and a third Americans are third generation a long history in CONCEPTUALIZING CONCEPTUALIZING ISLAMOPHOBIA IN THE UNITED STATESUNITEDSTATES ISLAMOPHOBIA IN The word Islamophobia ﬁrst appearedfirstappeared in academic discourse in 1997 in a report by the Runnymede Trust, which deﬁned the construct as “unfounded hostility towards report Runnymede Trust, which defined Islam and a fear or dislike of all or most Muslims.”9(p5) construct and fear “unfounded dislike all ormost Muslims.”?°) However, Islamophobia notes more than hostility; However, Islamophobia de- notes more than hostility; it reﬂects a history ofUS policy and discriminatory practices that enforce racial and xenophobic boundaries reflects US and history practices that enforce racial and xenophobic boundaries - around Muslims.’ Islam was an aspect of early US racism and was connected to the transatlantic slave trade—Americans were using the fear of Islam as a unifying concept to define what it means to be American.'* For example, until 1944, American courts denied citizenship to those perceived or feared to be Muslim orof Muslim ancestry, some of whom were Christians.'* After the Iranian Revolution in 1979, US 10,11 around Muslims.10,11 Islam was an aspect of early US racism and was connected to the transatlantic slave trade—Americans were using the fear of Islam as a unifying concept to deﬁne what it means to be American.12 For example, until 1944, American courts denied citizenship to those perceived or feared to be Muslim or of Muslim ancestry, some ofwhom were Christians.12 After the Iranian Revolution in 1979, US media coverage of Muslims became in- creasingly negative, which heightened discriminatory attitudes.13 Muslims became negative, attitudes.'* In the 1980s, 1980s, stereotypical images of the “terrorist” were applied to Middle Eastern communities, in- cluding Muslims and Sikhs.8,11 images “terrorist” were to Eastern communities, in- Muslims and Sikhs.*''! In 1996, the 1996, Antiterrorism and Effective Death Penalty Act led to investigation ofMuslim American social activity and to the deportation of Muslims with links to terrorist activity.11 These laws and media coverage form Penalty American social activity and to Muslims with links laws terrorist activity.'! Antiterrorism and Effective towards understanding of health and disease help explain the relationship between Islam- ophobia and health?andhealth? health disease help AJPH PERSPECTIVES FROM THE SOCIAL SCIENCES a foundation of structural Islamophobia. In the United States, Islamophobia is concep- tualized as social stigma toward Islam and Muslims, dislike of Muslims as a political force, and a distinct construct referring to anti-Muslim stereotypes, racism, or xeno- phobia.3,8 Such a deﬁnition illustrates how Islamophobia can affect public health at in- dividual, interpersonal, and structural levels. In a poll taken directly after 9/11, 60% of Americans reported unfavorable attitudes toward Muslims.2 Many Americans associate Muslims with fear-related terms such as violence, fanatic, radical, war, and terror- ism.2,6 Public opinion poll research, media coverage, and government crime data sug- gest that Islamophobic sentiment sharply rose after 9/11, leveled offin the late 2000s, and steadily increased after the 2010 Ground Zero mosque controversy.1,2,14 The media covered a lot of the protests and opposition to building a mosque close to Ground Zero. Any media exposure to Muslim-related issues is associated with a spike in negative attitudes toward Muslim Americans.13 In 2015, unfavorable attitudes toward Muslim Americans rose to a high of 67%.2 Hate speech and crimes against Muslim Americans are commonplace.1,14 Since the November 13, 2015, attacks in Paris, France, the Council on American–Islamic Relations reports a spike in threats, violence, and discriminatory acts, such as denial of em- ployment and targeting ofMuslim Ameri- cans (or those perceived to be Muslim).14 Opposition to Muslim Americans is freely expressed, including policies for proﬁling Muslims and a presidential campaign in which a candidate proposes a “ban on Muslims,” forcing Muslims to navigate a sociopolitical landscape that views them as outsiders. discrimination, which are known funda- mental causes or determinants of adverse health.15,16 Stigma and Health Stigma is deﬁned as the co-occurrence of labeling, stereotyping, separation, status loss, and discrimination in a context in which power is exercised.15 Stigma operates at multiple levels, including the individual, in- terpersonal (e.g., discrimination, hate crimes), and structural (e.g., community norms, in- stitutional policies).17 A stigmatized status affects health by undermining or exacerbating several processes—such as stress, the avail- ability of resources, social relationships, and psychological and behavioral responses—that can lead to adverse health outcomes.15 Members ofstigmatized groups often lack the necessary resources to act on health knowl- edge.18 Stigma can also trigger bias, which leads to unequal access to health-enhancing resources or medical care. Structural stigma is also associated with suicide, greater violence and homicide, and cardiovascular disease.17 As with other forms of stigma associated LINKING ISLAMOPHOBIA TO HEALTH From a public health perspective, the social climate ofIslamophobia in the United States is a risk factor for poor health. Islamophobia includes several known social processes that lead to adverse health outcomes. Spe- ciﬁcally, Islamophobia includes stigma and November 2016, Vol 106, No. 11 AJPH with HIV status, sexual orientation, or race, stigma experienced by Muslim Americans involves labeling, stereotyping, status loss, and discrimination. The stigmatized identity of Muslims was initially brought into focus by Edward Said’s Orientalism,19 which noted the Western perspectives that created a dehu- manizing representation of the exotic and barbarous Orient (countries of the Middle East, Africa, and Asia) that exists in opposition to the West. Islamophobia is rife with ste- reotypes ofMuslim Americans and Americans who look “Muslim-like,” from those per- taining to Muslim women and the veil to the assumption that all Muslim men are terror- ists.20 The spread ofIslamophobia has further sanctioned dehumanizing representations and stereotypes of Muslims in the United States, solidifying the construction of a stig- matized Muslim identity.21 Islamophobia operates as stigma through individual identity concealment, interpersonal experiences of discrimination and hate crimes, and structural conditions such as immigration policies tar- geting Muslim immigrants.8,11,21,22 For ex- ample, Muslim Arab Americans in New York City after 9/11 noted that they feared hate crimes and had anxiety about future threats to their safety, loss of community, isolation, and stigmatization.23 Discrimination and Health Discrimination at interpersonal and structural levels is a constitutive feature of a stigmatized identity. The Muslim American discriminatory experience is likely a combi- nation of appearance-based and religious discrimination.24 An established body of re- search documents the link between dis- crimination and health.16,18,25 Across multiple contexts, perceptions of unfair treatment, regardless of whether they are attributed to race or other social reasons, are adversely related to physical and mental health16,18,26 and health disparities.25 A 2015 review by Paradies et al.26 found that everyday experiences of discrimination are also associated with a wide variety of physical and mental health outcomes, such as coronary artery calciﬁcation, high levels of C-reactive protein, high blood pressure, giving birth to low-birth-weight infants, cognitive impairment, poor sleep, visceral fat, depression, psychological distress, anxiety, and mortality, as well as risk factors for poor health such as substance abuse. Discrimination affects health through pathways including reduced access to resources and increased exposure to risk factors, stress, physiological processes, allostatic load, reduced participa- tion in health care–seeking and health- promoting behaviors, and violence.26 Racial/ethnic discrimination ofMuslim Americans. The relationship and magnitude of the effects of discrimination on health are known to vary by racial and ethnic groups,27 highlighting the importance of group membership. Deﬁning the group context of Islamophobia is challenging, as Islamophobia includes discrimination based on race, na- tivity, physical appearance, and religion. Islamophobia both results from and con- tributes to the construction ofrace or socially constructed categories ofindividuals’ physical appearance in the United States.11,28 Because Muslims are often represented as coming from non-White groups, their re- ligious identity becomes linked with racial identity. As racism, Islamophobia affects the lives of people with “Muslim-like” appear- ances in the United States. But who exhibits “Muslim-like” appearance? It extends Samari Peer Reviewed Perspectives From the Social Sciences 1921 AJPH PERSPECTIVES FROM THE SOCIAL SCIENCES beyond race to include such attributes as clothing.Having a certain skin tone,wearing a hijab or turban, and speaking with a cer- tain accent are all physical markers that create a vulnerability to Islamophobia; however, non-Muslims such as Christians and Sikhs can also have these characteris- tics.11 In the Detroit, Michigan, Arab American community, which includes both Muslims and Christians, increased psycho- logical distress, lower levels of happiness, and poorer perceptions of health status are associated with post-9/11 abuse and discrimination.29,30 Middle Eastern Americans are most often assumed to have “Muslim-like” appearances and are thus exposed to Islamophobia. While they are classiﬁed as “White” by the Ofﬁce of Management and Budget, they do not beneﬁt from White privilege and are still exposed to Islamophobia based on physical appearance.10 In reality, they come from many different countries of the Middle East and North Africa30 and include many different nationalities, religions, and racial categories, including Black and White. One race does not ﬁt all for the relationship between discrimination and health out- comes,27 and Islamophobia does not affect individuals from 1 racial category—it spans racial groups, including those classiﬁed as White. Muslims who identify as non- White and reside in an ethnic enclave re- port more discrimination than Muslims who identify as White, but Arab Americans who identify as White experience more discrimination-associated psychological distress.30 Given the racial diversity of Muslim Americans, pathogenic conditions of Islamophobia have to be understood across racial groups. Religious discrimination ofMuslim Americans. Islamophobia as a form ofreligious discrimination may coexist with or override racial and appearance-based discrimination, such that religious identiﬁcation may precede, overlap, or follow race as a basis for dis- crimination.31,32 However, a review by Padela and Curlin24 notes that there is far less research on the health effects of religious discrimination. A study from the United Kingdom indicates that racism and religious discrimination form distinct measures. Ethnic Pakistani, Indian, Bangladeshi, White, Other Asian, Black, Arab, and mixed race Muslims are equally likely to record speciﬁc discrim- inatory experiences.31 Religion can unite individuals from dis- parate racial, ethnic, and socioeconomic categories.22,24 About 69% ofMuslims in the United States say that religion is very im- portant in their lives.6 Although diverse, the Muslim American community could share a religious worldview that can inﬂuence health-related behaviors and interactions with the health care system.32 Islamic tenets— such as abstention from drinking alcohol and the belief that “physicians are actors of God” and that all Muslims should regularly receive medical care—can promote health.33,34 Religious discrimination alienates individuals from the health system, directly interfering with health messaging in Islam that promotes disease prevention and care seeking.22,24 However, as with other religions, Muslim Americans follow a range of Islamic and personal religious beliefs, so discriminatory assumptions can also interfere with health care. For example, in a qualitative study of Iraqi refugees, participants described health care providers as unhelpful, patronizing, and having stereotypical attitudes toward Muslim women—believing they are excessively pious, have too many children, and are oppressed by their husbands.35 Religious discrimination is hypothesized to lead to stress, social isolation, reductions in health- promoting behaviors, discounting of health care providers’ information, and delays in seeking medical care.24 Multilevel Pathways to Health Research on stigma, discrimination, and health shows that Islamophobia can have a negative inﬂuence on health through the disruption of several different systems— individual (stress reactivity and stereotype threat), interpersonal (social relationships and socialization processes), and structural (in- stitutional policies and media coverage). Although it is not based on an exhaustive literature review of the health of Muslim Americans, this section shows how Islam- ophobia includes many individual, in- terpersonal, and structural processes that are known determinants of health. At the individual level, Islamophobia in- creases stress among Muslim Americans.29 1922 Perspectives From the Social Sciences Peer Reviewed Samari Stress can play a role in the onset, progression, and severity of illness.16 Social marginaliza- tion increases stress, the physiological re- sponse to stress—including higher blood cortisol and heart rates—and the health- diminishing effects of that response over time.36 This continuous activation of the allostatic system wears out regulatory systems. Discrimination of Muslim Americans has been linked to stress-related outcomes such as paranoia and psychological distress.29,37 More than 50% of Muslim youths in the United States report experiencing bullying in schools.14 This early exposure to discrimi- nation is likely to have cumulative health effects over the life course.36 Stereotype threat—the activation of negative stereotypes among stigmatized groups, which creates expectations and anxieties that can adversely affect social and psychological functioning18—can also con- tribute to stress.38 Stigmatized individuals become aware of and react to societal ste- reotypes.38 Stereotype threat can negatively affect physiological, psychological, and self- regulatory processes that contribute to poor health.38 Furthermore, young Muslim American men have been found to hide their identities.21 Muslim Americans could also experience negative health outcomes from identity concealment or internalizing Islam- ophobic stereotypes.39 For example, in a qualitative study, Muslim Arab American immigrant women note that wearing the hijab leads to discrimination, which takes a toll on their physical and mental health.34 At an interpersonal level, Islamophobia- based stereotype threat can adversely affect the patient–provider relationship by pro- ducing impaired communication, discounted provider information, or failure to obtain medical care.38 In a qualitative study, Muslim immigrant women expressed discomfort with their health care providers.40 Muslim Americans may fear obtaining services or feel misunderstood by health care providers.33 In general, Islamophobia affects interactions with the health care system and prevents individuals from accessing preventative health services.33 Stigma is also known to cause social iso- lation.15 Islamophobia deprives American Muslims of the health-promoting aspects of social connection, creating an environment of limited social ties and thus increased AJPH November 2016, Vol 106, No. 11 AJPH PERSPECTIVES FROM THE SOCIAL SCIENCES vulnerability. Muslim Americans are fully aware of their devalued position in soci- ety.20,21 Hostility in the public arenamakes it difﬁcult for Muslim Americans to develop a community life. Muslim American youths even police each other within their own communities.21 Research has suggested that identity-afﬁrming networks can buffer the adverse effects ofdiscrimination on health.41 In general, social support and social networks promote physical and mental health.42 Alack of social support has been linked to de- pression among Arab Muslim immigrant women.43 However, Arab Muslims who associate with identify-afﬁrming networks have more psychological distress.30 Identi- fyingasMuslim inour currentsociopolitical contextismoreofa stressor than an avenue for social support and so is more detrimental than protective for health. Islamophobia can also produce health disparities through structural stigma at the macro level. Although research on structural stigma of Muslim Americans and health is limited, 1 study found that in a period of heightened stigma following September 11, 2001, pregnant women of Arab descent had poor birth outcomes.44 Discriminatory ideologies in the structural features of in- stitutions, policies, and media coverage can create or reinforce health disparities.25 For example, the 2001 Patriot Act and associated legislation gave the state new powers, in- cluding surveillance, which proﬁles Muslim Americans or “Muslim-like” Americans, contributing to social segregation and dif- ferential access to resources for Muslim Americans.11 Immigration policy also con- tributes to structural inequity and social segregation.25 There is a pattern ofracial and religious proﬁling in the naturalization process to block citizenship of individuals from Muslim countries.8,12 In addition to these discriminatory policies, the media also shape the structural social environment of Muslim Americans in ways that can affect health. Negative media coverage ofMuslims plays an active role in social understanding ofMuslims as “the enemy” and in perpet- uating Islamophobia.13 Such structural fac- tors as exclusionary policies and media coverage can lead to differential access to fundamental determinants of health such as education and employment, limit access to health and social services, and contribute November 2016, Vol 106, No. 11 AJPH to experiences of discrimination, stress, and illness.18,25 RESEARCH DIRECTIONS Given the expanding climate of Islam- ophobia and the link between Islamophobia and social determinants of health, there are several promising research directions. Public health scholars can take steps to better un- derstand and address the health disparities that Muslim Americans face in the United States. Despite a large body of research on dis- crimination and health, the virtual absence of an established literature on Islamophobia and health is striking. What studies exist tend to focus on mental health, showing adverse mental health outcomes for Muslim Ameri- cans.22–24,29,30,37 Research on Islamophobia and physical health outcomes is extremely limited. However, 1 study linked structural stigma toward Arab Americans to poor birth outcomes,44 and a brief review of Muslim American health by Padela and Raza found disparities in cancer and reproductive health.32 Although both the physical and mental health consequences ofIslamophobia are important areas for future inquiry, more research on such Islamophobia and physical health outcomes as cardiovascular disease, cholesterol levels, body mass index and other measures of obesity, and diabetes is needed. Research is also needed on the mental and physical health effects of Islamophobia for Muslim men and women, as research tends to focus on Muslim American women.40,43,44 The lack of health literature on Islam- ophobia makes it difﬁcult to assess its in- cidence and to understand multiple sources of discrimination for Muslims in the United States. Islamophobia is an opportunity to examine the health effects ofthe intersection ofseveral forms ofdiscrimination.22 Muslims vary by race, ethnicity, national origin, social class, gender, and immigration status. Any or all of these identity constructs can be sources of social bias, and attaining an accurate picture ofrisk requires considering all sources ofsocial bias.45 Generally, inadequate research attention is given to the ways in which racism combines with multiple aspects of stigma and discrimination, additively and interactively, to affect health.18 Padela and Raza suggest that more research on Muslim Americans is needed to disentangle the in- dependent inﬂuences of religion, race, and ethnicity on health disparities.32 Future re- search should also unpack the effects of physical appearance, immigration status, and gender or the intersection ofthese constructs as sources of discrimination. To better un- derstand Islamophobia and health, studies should focus on the experience of those af- fected and pose questions about both racial and nonracial discrimination experiences. Asking about different dimensions of dis- crimination, such as religious attire and im- migration status, may capture more of the pathogenesis of Islamophobia. Religion may act in conjunction with immigration status, race, or gender as a basis for discrimination for this population. Multigroup analyses could also help elucidate the effects ofrace, nativity, physical appearance, and religion. The effects of moderators and mediators for stigma, discrimination, and health remain largely unknown and are not uniform across groups.15,18 Important research di- rections should include understanding the role of behavioral responses, stress, social isolation, stereotype threat, identity con- cealment, and access to resources on the pathway between Islamophobia and health. For example, the relationship between Islamophobia and health could operate through discrimination-associated stress for a Muslim American woman who wears a hijab and through stereotype threat and identity concealment for a Muslim Ameri- can male who tries to conceal his Muslim identity. Is one pathway more damaging than another? Are the different aspects of Islam- ophobia multiplicative for health? Further research is needed on whether certain path- ways and levels of Islamophobia-driven stigma are more or less damaging for physical and mental health. It is also important to explore how Islamophobia affects socializa- tion, and how socialization experiences and coping strategies in response to Islam- ophobia may modify the relationship be- tween exposure to Islamophobia and health. Identifying these pathways and conceptual links can provide further insights into how to prevent the health-damaging effects of Islamophobia. The research to date has typically con- sidered the experience of Islamophobia at the individual level. Structural stigma and Samari Peer Reviewed Perspectives From the Social Sciences 1923 AJPH PERSPECTIVES FROM THE SOCIAL SCIENCES racism remain understudied.17,25,45 There- fore, less attention has been paid to how societal conditions (e.g., institutional policies) may disadvantage Muslim Americans. Islamophobia and health have to be un- derstood and addressed at the structural level, where stigmatization is produced and can set in motion such pathways as lack of social support.15 For example, does living in a Muslim American community buffer some of the effects of Islamophobia? Does living in a more Islamophobic community have detrimental health effects? It would be im- portant to understand whether living in areas with more structural barriers—such as neg- ative media coverage, policies against building mosques, or the presence of fewer Muslim Americans—is associated with negative health outcomes. Comparisons between the United States and European countries could also offer insights into the relationship be- tween structural Islamophobia and health. Empirical research should span multiple levels of analysis to fully capture the way Islam- ophobia operates to shape population health. This research agenda is not without challenges and limitations. The ﬁrst challenge is identifying Muslim Americans within existing health care databases and survey data. Researchers can only identify people who are likely to be Muslim, which in the United States usually means those ofMiddle Eastern or South Asian descent. However, a large proportion of Arabs are not Muslim—many are Christian.7 Although both Middle Eastern Americans and Muslim Americans can ex- perience Islamophobia, we should be careful not to conﬂate the 2 groups.11 We need to collect survey data that enable us to disen- tangle associations between religious group membership experiences and health outcomes. For researchers to consider the role of Islamophobia in the production and mainte- nance ofhealth disparities, they need data that measure multiple dimensions ofIslamophobia and Muslim identity. This would provide further insights into the relationship between stigmatized identities, discrimination, and health disparities. In health research, the Per- ceived Religious Discrimination Scale and measures of religious discrimination in health care have been developed for use with Mus- lims.24,37 However, measures that include several dimensions of Islamophobia-driven discrimination and implicit bias, as well as the threat of Islamophobia, are needed. Data that include measures of Islamophobia over the life course and Islamophobic social envi- ronments can help assess variation among social groups.3 Longitudinal studies should gather information about Islamophobia over time and how it is inﬂuenced by social changes. A third challenge is developing appro- priate theoretical and conceptual models to help explainhealthoutcomes among Muslim Americans. Given the unique in- teraction ofmultiple marginalized identities in this population, we need to be mindful of developing population-appropriate con- ceptual frameworks to explain Muslim American health. Failure to consider both the multilevel stigmatizing and discrimina- tory aspects of Islamophobia in theoretical models of population health leads to an underappreciation of aspects of Islam- ophobia that produce poor health. The current climate of Islamophobia and the research on stigma, discrimination, and health suggest that greater attention needs to be paid to Islamophobia and public health in the United States. Islamophobia likely exerts a greater impact on population health than research to date suggests. Future public health research should explore the multilevel and multidimensional pathways linking Islamophobia to population physical and mental health.
    `;
 
    let data = await llm.getSlidesForText(extracted_text);
    data.forEach(async (element) => {
      const child = element.bullets.map((elm) => ({
        type: "TEXT",
        children: [elm],
        width: 100,
        height: "auto",
        top: 0,
        left: 0,
      }));
      console.log(child);
          await addPage({
        elements: child,
      });  
    });
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

export const App = () => {
  const [state, setState] = React.useState<UIState>(initialState);

  const {
    text,
    color,
    fontWeight,
    fontStyle,
    decoration,
    textAlign,
    width,
    rotation,
    useCustomWidth,
  } = state;

  const disabled = text.trim().length < 1 || color.trim().length < 1;

  React.useEffect(() => {
    appElementClient.registerOnElementChange((appElement) => {
      setState(appElement ? appElement.data : initialState);
    });
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          This example demonstrates how apps can create text elements inside app
          elements. This makes the element re-editable and lets apps control
          additional properties, such as the width and height.
        </Text>
        <FormField
          label="Text"
          value={text}
          control={(props) => (
            <TextInput
              {...props}
              onChange={(value) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    text: value,
                  };
                });
              }}
            />
          )}
        />
        <Title size="small">Custom options</Title>
        <FormField
          label="Color"
          control={() => (
            <ColorSelector
              color={color}
              onChange={(value) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    color: value,
                  };
                });
              }}
            />
          )}
        />
        <FormField
          label="Font style"
          value={fontStyle}
          control={(props) => (
            <Select<FontStyle>
              {...props}
              options={[
                { value: "normal", label: "Normal" },
                { value: "italic", label: "Italic" },
              ]}
              onChange={(value) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    fontStyle: value,
                  };
                });
              }}
              stretch
            />
          )}
        />
        <FormField
          label="Font weight"
          value={fontWeight}
          control={(props) => (
            <Select<FontWeight>
              {...props}
              options={[
                { value: "normal", label: "Normal" },
                { value: "bold", label: "Bold" },
              ]}
              onChange={(value) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    fontWeight: value,
                  };
                });
              }}
              stretch
            />
          )}
        />
        <FormField
          label="Decoration"
          value={decoration}
          control={(props) => (
            <Select<Decoration>
              {...props}
              options={[
                { value: "none", label: "None" },
                { value: "underline", label: "Underline" },
              ]}
              onChange={(value) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    decoration: value,
                  };
                });
              }}
              stretch
            />
          )}
        />
        <FormField
          label="Text align"
          value={textAlign}
          control={(props) => (
            <Select<TextAlign>
              {...props}
              options={[
                { value: "start", label: "Start" },
                { value: "center", label: "Center" },
                { value: "end", label: "End" },
              ]}
              onChange={(value) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    textAlign: value,
                  };
                });
              }}
              stretch
            />
          )}
        />
        <FormField
          label="Width"
          value={useCustomWidth}
          control={(props) => (
            <RadioGroup
              {...props}
              options={[
                {
                  label: "Fit to content",
                  value: false,
                },
                {
                  label: "Use custom width",
                  value: true,
                },
              ]}
              onChange={(value) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    useCustomWidth: value,
                  };
                });
              }}
            />
          )}
        />
        {useCustomWidth ? (
          <FormField
            label="Width"
            value={width}
            control={(props) => (
              <NumberInput
                {...props}
                min={1}
                onChange={(value) => {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      width: Number(value || 1),
                    };
                  });
                }}
              />
            )}
          />
        ) : undefined}
        <FormField
          label="Rotation"
          value={rotation}
          control={(props) => (
            <NumberInput
              {...props}
              min={-180}
              max={180}
              onChange={(value) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    rotation: Number(value || 0),
                  };
                });
              }}
            />
          )}
        />
        <Button
          variant="primary"
          onClick={() => {
            appElementClient.addOrUpdateElement(state);
            renderResponse();
          }}
          disabled={disabled}
          stretch
        >
          Add or update text
        </Button>
      </Rows>
    </div>
  );
};
